import type { Project } from "@/lib/types";
import { DetectionFrame } from "@/components/detection-frame";
import { StackChips, StatusBox } from "@/components/boxes";

export function ProjectRow({ project }: { project: Project }) {
  const title = project.fullName ? `${project.name} (${project.fullName})` : project.name;
  const body = (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 rounded-lg px-2 py-6 md:px-4 transition-colors group-hover:bg-paper-raised">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
        <h3 className="text-xl leading-7 font-semibold tracking-[-0.01em]">{title}</h3>
        <StatusBox status={project.status} />
      </div>
      <span className="col-start-2 row-start-1 text-sm leading-7 text-ink-muted">{project.year}</span>
      <p className="col-start-1 max-w-[640px] text-base leading-[26px] text-ink-muted">{project.description}</p>
      {project.award && <p className="col-start-1 text-sm leading-[22px] font-medium">{project.award}</p>}
      <StackChips stack={project.stack} className="col-start-1 mt-1" />
    </div>
  );

  return (
    <li className="-mx-2 border-b border-line md:-mx-4">
      <DetectionFrame label={`${project.name}: ${project.status.label}`} locked={project.featured}>
        {project.href ? (
          <a href={project.href} className="group block rounded-lg text-ink no-underline" target="_blank" rel="noreferrer">
            {body}
          </a>
        ) : (
          <div className="group">{body}</div>
        )}
      </DetectionFrame>
    </li>
  );
}
