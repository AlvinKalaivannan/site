import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { projects as localProjects } from "@/content/projects";
import type { Project, RepoRef, Stage, Status, StatusState } from "@/lib/types";

/** Cache tag for everything pulled from GitHub. The webhook route revalidates it. */
export const PROJECTS_TAG = "projects";

const STATES: StatusState[] = ["active", "partial", "waiting", "done"];

/**
 * Shape of the site.json a repo may publish at its root. Every field is optional;
 * anything missing or malformed falls back to the local content.
 */
type SiteJson = {
  status?: Status;
  currentStage?: number;
  stages?: { name: string; status: Status }[];
};

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

function isStatus(value: unknown): value is Status {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.label === "string" && v.label.length > 0 && v.label.length <= 40 && STATES.includes(v.state as StatusState);
}

async function fetchSiteJson({ owner, repo }: RepoRef): Promise<SiteJson | null> {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/site.json`);
    if (!res.ok) return null;
    return (await res.json()) as SiteJson;
  } catch {
    return null;
  }
}

async function fetchLastCommit({ owner, repo }: RepoRef): Promise<string | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, { headers: githubHeaders() });
    if (!res.ok) return undefined;
    const [latest] = (await res.json()) as { commit?: { committer?: { date?: string } } }[];
    return latest?.commit?.committer?.date;
  } catch {
    return undefined;
  }
}

/** Overlay a repo's live status onto the local project, keeping local copy as the fallback. */
function merge(project: Project, live: SiteJson | null, updatedAt?: string): Project {
  const merged: Project = { ...project, updatedAt: updatedAt ?? project.updatedAt };
  if (!live) return merged;

  if (isStatus(live.status)) merged.status = live.status;

  if (project.stages && Array.isArray(live.stages)) {
    // Match by stage name so a repo can only update statuses, never rename or add stages.
    merged.stages = project.stages.map((stage): Stage => {
      const remote = live.stages!.find((s) => s?.name === stage.name);
      return remote && isStatus(remote.status) ? { ...stage, status: remote.status } : stage;
    });
  }

  if (
    project.stages &&
    typeof live.currentStage === "number" &&
    Number.isInteger(live.currentStage) &&
    live.currentStage >= 0 &&
    live.currentStage < project.stages.length
  ) {
    merged.currentStage = live.currentStage;
  }

  return merged;
}

/**
 * Cached for hours (the hourly backup refresh) and tagged so the GitHub webhook
 * route can mark it stale the moment a repo is pushed.
 */
export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(PROJECTS_TAG);

  return Promise.all(
    localProjects.map(async (project) => {
      if (!project.repo) return project;
      const [live, updatedAt] = await Promise.all([fetchSiteJson(project.repo), fetchLastCommit(project.repo)]);
      return merge(project, live, updatedAt);
    }),
  );
}
