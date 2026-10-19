# alvinkalaivannan.com

Personal site built on the **ak system** design system. Next.js 16 (App Router, Cache
Components), Tailwind CSS 4, TypeScript.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where things live

| What | File |
| --- | --- |
| All copy: name, hero line, contact, links | `src/content/projects.ts` (`site`) |
| Projects: descriptions, stacks, awards, default statuses | `src/content/projects.ts` (`projects`) |
| Design tokens (both themes, status colors) | `src/app/globals.css` |
| Detection frame, readout, status box, stack chip, stage track | `src/components/` |
| Live project data from GitHub | `src/lib/github.ts` |
| GitHub webhook endpoint | `src/app/api/revalidate/route.ts` |
| Fonts (self-hosted, SIL OFL) | `src/app/fonts/` |

Descriptions follow the ak system rule: one line, about 10 words, what it does. Awards go
in `award`, never in the description.

## Auto-updating project statuses

Projects with a `repo` read a `site.json` from that repo plus its latest commit date.
The data is cached for an hour, and a GitHub push webhook refreshes it immediately.
Setup steps and the `site.json` format are in `repo-kit/README.md`; a ready VSCS
`site.json` is in `repo-kit/vscs/`.

## Deploy on Vercel

1. Push this folder to a new GitHub repo and import it in Vercel.
2. Add environment variables (see `.env.example`):
   - `REVALIDATE_SECRET`: any long random string; use the same value as the webhook secret.
   - `GITHUB_TOKEN` (optional): a fine-grained token with public read access, which
     raises GitHub's API rate limit.
3. Point your domain at the Vercel project.
4. Put your resume at `public/resume.pdf`; every "Resume" link opens it.

## Adding 21st.dev components

The project is shadcn-compatible (`components.json`, `src/lib/utils.ts`), so a 21st.dev
component installs with its `npx shadcn@latest add <url>` command. After adding one,
strip its own colors, radii, shadows and fonts down to the ak system tokens in
`globals.css` (`bg-paper`, `text-ink`, `border-line` and so on).
