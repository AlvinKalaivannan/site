# CLAUDE.md: alvinkalaivannan.com

Context for any Claude session working on this repo. Read this first, then `AGENTS.md`
(Next.js 16 rules: this version differs from older training data; check
`node_modules/next/dist/docs/` before using framework APIs).

## Who this is for

- **Owner:** Alvin Kalaivannan, first-year Computer Engineering student at the University
  of Toronto. Focus: computer vision (CV) and ML. Based near Toronto (Whitby, ON).
- **Purpose:** a professional personal site that shows what he is building. Main audience
  is recruiters and founders he cold emails for **summer 2027 internships**. He's casting a
  wide net (CV, ML, software, dev tools), so the site keeps CV/ML as the sharp focus and lets
  the project list show range. Tailoring happens in each email, not on the site.
- **Positioning:** "I build CV and ML systems that flag risk before it turns into damage."
  His recent projects share that thread: Overstride (injury risk), VSCS (collision risk),
  Apiary AI (catching misbehaving AI agents).

## How Alvin likes to work

- Casual, direct, lowercase in chat. Keep replies short and concrete.
- For design or copy choices, give 2 to 4 concrete options (visual where possible), say
  which you recommend and why, then apply his pick. He likes a designer's opinion but makes
  the final call.
- He's "big on capitalization" in site copy (see Copy rules).
- Brief, straight-to-the-point copy. Nothing extra. Bold and plain, honest about being early.
- Don't overclaim. Only list tools that are actually in use; report real results.

## Stack and structure

Next.js 16.4 (App Router, Cache Components on, Partial Prefetching), React 19, Tailwind
CSS 4, TypeScript. Deployed on Vercel. shadcn-compatible (`components.json`,
`src/lib/utils.ts` `cn()`), so 21st.dev components install via `npx shadcn@latest add <url>`.
21st.dev is for structure only: strip any added component's own colors, radii, shadows and
fonts down to the tokens below.

| What | Where |
| --- | --- |
| All copy and links | `src/content/projects.ts` (`site`, `projects`) |
| Types | `src/lib/types.ts` |
| Tokens (light + dark, status colors) | `src/app/globals.css` |
| Components | `src/components/` (`boxes.tsx`, `project-row.tsx`, `stage-track.tsx`, `site-chrome.tsx`) |
| Live GitHub data | `src/lib/github.ts` |
| Webhook endpoint | `src/app/api/revalidate/route.ts` |
| Fonts (self-hosted, SIL OFL) | `src/app/fonts/` |
| Repo kit for project repos | `repo-kit/` |

Fonts are self-hosted on purpose: builds must never depend on Google Fonts.

## Design system: "ak system"

There is a matching design system artifact in claude.ai called **ak system**. This file and
`globals.css` are the source of truth for code.

**Feel:** quiet, precise, cool-toned. Blue-black ink on bench gray. One accent (raspberry)
used sparingly. No shadows, no gradients, no decorative icons, no emoji.

**Palette (Summer light, chosen via a color analysis):**

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| paper | #edf0f3 | #0b111b | page background |
| paper-raised | #f8f9fb | #131b27 | hover fill on project rows |
| line | #d5dae0 | #222c3a | hairlines |
| line-strong | #7d8692 | #5f6b7b | control borders, link underlines |
| ink | #0e1726 | #e8edf3 | primary text, primary button, stack chips |
| ink-muted | #4e5968 | #9aa6b5 | secondary text |
| signal | #d81b60 | #ff5c8f | raspberry accent: progress bar fill, button hover |
| on-signal | #ffffff | #0b111b | text on signal |
| signal-ink | #a8124c | #ff8fb1 | link hover, focus ring |
| ok | #177345 | #4cc68a | availability dot + text |

**Status colors: "Calm spectrum".** One meaning per color; the word always carries the
meaning too.

| State | Light bg / text | Dark bg / text | Used for |
| --- | --- | --- | --- |
| active | #fbe3ec / #a8124c | #3a0f1f / #ff8fb1 | Building, In progress, Capture prep, current stage |
| partial | #e1eaf8 / #1d4f9e | #14284a / #9cc0ff | Tested on fixture (partly proven) |
| waiting | #e3e7ec / #3d4756 | #222c3a / #b4bfcc | Built, awaiting capture / blocked |
| done | #ddf0e4 / #12603a | #0f3220 / #7fdca6 | Complete |

All pairs pass WCAG AA in both themes. Keep it that way when adding colors.

**Boxes:** three kinds, never mixed up.
- **StackChip:** tools. Always dark (`bg-ink text-paper`), never colored.
- **StatusBox:** where work stands. Always tinted with the Calm spectrum, never dark.
- No other boxes. Section layouts use hairlines and whitespace, not cards.

**Type:** Schibsted Grotesk only (400/500/600). Hero name 72px (clamps down to 44px),
0.95 leading, -0.035em tracking. Section headings 28/34 semibold. Project names 20/28
semibold. Body 16/26, hero line 18/30. Paragraphs max 640px wide. Left-aligned everything.

**Layout:** single column, max 1080px, 16px side padding on phones, 48px from 768px.
Sections separated by 96px. Must work at 360px wide with no horizontal scroll.

**Motion:** minimal. Hover color/background transitions only (about 120 to 160ms). Respect
`prefers-reduced-motion`.

**Removed on purpose (do not reintroduce):**
- The "detection frame" (raspberry corner brackets plus a mono readout label around the
  name, rows and stages). Alvin didn't like it. IBM Plex Mono went with it; there is no
  mono font on the site.
- An About section. "If they want to know more, they should meet me."
- Any mention of Crackd (his past internship). It lives on his resume only; the site is a
  fresh chapter.
- "Class of 3T0".
- A featured "demo" video box for VSCS (there's no demo yet; the stage track replaced it).

If the frame removal hasn't landed yet when you read this, it's the next task: delete
`detection-frame.tsx` and `readout.tsx`, their CSS (`.ak-frame`, `.ak-mark`, `ak-draw`),
`site.readout`, and the Plex Mono font; keep row hover and keyboard focus visible.

## Copy rules

- Proper capitalization everywhere: name in title case ("Alvin Kalaivannan"), headings and
  buttons in sentence case ("What I'm building", "Get in touch"), proper nouns as their
  owners write them (UofT, VSCS, PyTorch, OpenCV, MediaPipe, BananaMOV, ElevenLabs).
- Say "CV", not "computer vision", in site copy.
- Project descriptions: one line, about 10 words, what it does. Nothing else.
- Awards go on their own line under the description, never inside it.
- No labels above headings, no all caps, no numbered markers unless the content is a real
  sequence (the VSCS stages are; the project list is not).
- Buttons say what happens ("Email me"). Use `↗` only on links that leave the site.
- Facts only. No invented metrics, dates or tools. If unsure, ask Alvin.

## Current page content

Order: nav, hero, What I'm building, Where VSCS is now, Get in touch, footer.

- **Nav:** AK · Work · Contact · Resume ↗
- **Hero:** "Alvin Kalaivannan". Line: "Computer Engineering at UofT. I build CV and ML
  systems that flag risk before it turns into damage." Buttons: Email me, Resume ↗.
  Availability: "Open to summer 2027 internships".
- **Projects** (newest first; status box next to the name):
  - VSCS (Vehicle Scanning Collision System), Building, 2026: "Segments a scanned vehicle
    into its parts and scores collision risk for each one." Python, PyTorch, OpenCV.
  - Apiary AI, Building, 2026: "Governance and containment for developers running multiple
    AI coding agents at once." Next.js, TypeScript, Tailwind CSS, OpenTelemetry.
    (Co-built with a teammate.)
  - Overstride, Complete, 2026: "Identifies the injured limb from running video: AUC 0.610
    on motion capture, 0.583 on real video." Python, PyTorch, AthleticsPose,
    AthletePose3D, Google Colab.
  - BananaMOV, Complete, 2026: "Generates royalty-free music for any video using a VLM
    pipeline." Award: Best Use of ElevenLabs, JAMHacks 10. Next.js, TypeScript,
    Gemini 2.5 Flash, ElevenLabs.
  - Konnect, Complete, 2025: "Android app that notifies nearby users so they can meet up."
    Award: Best Pitch, United Hacks V5. Kotlin, Java, Android, Supabase.
- **Where VSCS is now:** "Four stages, built on a scan of a real vehicle and public driving
  datasets." Stages (numbered, raspberry bar fills up to the current one):
  1 Scan (Capture prep, current), 2 Segment (Tested on fixture), 3 Track (Built, awaiting
  capture), 4 Score (In progress). Link: Follow the build on GitHub ↗, plus "Last updated
  <date>" from the latest commit.
- **Get in touch:** "I'm looking for CV and ML internships for summer 2027. Email is the
  fastest way to reach me." Links: alvinkalaivannan@gmail.com, GitHub ↗
  (github.com/AlvinKalaivannan), LinkedIn ↗ (linkedin.com/in/alvinkalaivannan), with
  GitHub and LinkedIn icons from react-icons (Font Awesome brands).
- **Footer:** "Alvin Kalaivannan, 2026" and "Built with Next.js and a design system of my own."

## Auto-updating project data

- Projects with a `repo` in `src/content/projects.ts` read `site.json` from that repo's
  root (via raw.githubusercontent.com) plus the latest commit date (GitHub API, optional
  `GITHUB_TOKEN`).
- `site.json` may set `status`, `currentStage`, and `stages[].status` (matched by name;
  can't rename or add stages). States: active, partial, waiting, done. Labels max 40 chars.
  Invalid data is ignored and the local defaults are used, so a bad file never breaks the page.
- `getProjects()` uses `"use cache"` + `cacheLife("hours")` + `cacheTag("projects")`.
  `POST /api/revalidate` verifies GitHub's `x-hub-signature-256` against
  `REVALIDATE_SECRET` and calls `revalidateTag("projects", "max")`.
- Descriptions, stacks and awards never come from repos; Alvin edits those here.
- Setup for project repos: `repo-kit/README.md`. VSCS's ready `site.json` is in
  `repo-kit/vscs/`.

## VSCS facts (for status updates)

Repo: github.com/AlvinKalaivannan/VSCS-Vehicle-Scanning-Collision-System-. Advisory-only
research prototype estimating per-component collision risk at low speed. Status lives in
`docs/STATUS.md` (Phase P1, capture prep, as of 2026-10-12). Subject vehicle is now a 2025
Toyota RAV4 (the van is the second vehicle). Phase 2 steps work on the test fixture; 3D
fusion is in review; perception is built but blocked on measuring the camera mount; the risk
sweep is a draft. Planned tools (Grounding DINO, SAM 2, COLMAP, nuScenes) aren't listed on
the site until they run on real data.

## Open items

- Remove the detection frame (see above) if not done yet.
- `public/resume.pdf`: Alvin adds his resume; all Resume links point there.
- Vercel: set `REVALIDATE_SECRET` (and optionally `GITHUB_TOKEN`), connect the domain
  alvinkalaivannan.com.
- VSCS repo: add `site.json`, the CLAUDE.md "Website status" section, and the push webhook
  to `https://alvinkalaivannan.com/api/revalidate`.
- Possibly later: a new signature element to replace the frame, if the page feels too plain.

## Checks before every commit

`npm run lint` and `npm run build` must pass. Look at the page at 1280px and 390px wide, in
light and dark mode. No horizontal scroll, visible keyboard focus, contrast intact.
