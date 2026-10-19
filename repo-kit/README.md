# Repo kit: keeping the site in sync with your projects

The site reads a small `site.json` from the root of each project repo listed in
`src/content/projects.ts` (any project with a `repo`). It also reads the date of the
latest commit. Descriptions, stacks and awards never come from the repo; you edit
those in `src/content/projects.ts`.

## What site.json controls

| Field | What it changes on the site |
| --- | --- |
| `status` | The status box next to the project name, e.g. `{ "label": "Building", "state": "active" }` |
| `stages[].status` | The status box for each stage in the "Where VSCS is now" track, matched by stage name |
| `currentStage` | Which stage the bar fills up to and the detection frame locks onto (0 = first) |

`state` must be one of `active` (raspberry), `partial` (blue), `waiting` (gray) or
`done` (green). Labels are capped at 40 characters. Anything invalid is ignored and the
site falls back to the values in `src/content/projects.ts`, so a typo can never break
the page.

## Set up VSCS (one time)

1. Copy `vscs/site.json` to the root of the VSCS repo and push it.
2. Add this to the VSCS `CLAUDE.md` so Claude Code keeps it current:

   ```
   ## Website status (site.json)
   Whenever docs/STATUS.md changes phase, stage progress or health, update site.json
   at the repo root in the same commit. Stages are Scan, Segment, Track, Score (do not
   rename). Each status is {label, state}; state is one of active, partial, waiting,
   done. Labels stay short and plain (under 40 characters), e.g. "Capture prep",
   "Tested on fixture", "Built, awaiting capture", "Working on real data", "Complete".
   currentStage is the zero-based index of the stage being worked on.
   ```

3. In the VSCS repo, go to Settings, Webhooks, Add webhook:
   - Payload URL: `https://<your-domain>/api/revalidate`
   - Content type: `application/json`
   - Secret: the same value as `REVALIDATE_SECRET` in Vercel
   - Events: just the push event

After that, every push to VSCS refreshes the site within a visit or two. If a webhook
is ever missed, the site still refreshes on its own every hour.

## Adding another project

Give the project a `repo` in `src/content/projects.ts`, add a `site.json` to that repo
with at least a `status`, and add the same webhook. Projects without a `site.json`
simply keep the status written in `src/content/projects.ts`.
