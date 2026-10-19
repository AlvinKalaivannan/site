import type { Project } from "@/lib/types";

/**
 * Editorial content for every project. Descriptions, stacks and awards live here
 * so you control the copy. Status, stages and the current stage are defaults:
 * when a repo publishes a site.json, those fields are replaced by the repo's values.
 */
export const projects: Project[] = [
  {
    slug: "vscs",
    name: "VSCS",
    fullName: "Vehicle Scanning Collision System",
    year: "2026",
    description: "Segments a scanned vehicle into its parts and scores collision risk for each one.",
    stack: ["Python", "PyTorch", "OpenCV"],
    status: { label: "Building", state: "active" },
    repo: { owner: "AlvinKalaivannan", repo: "VSCS-Vehicle-Scanning-Collision-System-" },
    href: "https://github.com/AlvinKalaivannan/VSCS-Vehicle-Scanning-Collision-System-",
    featured: true,
    currentStage: 0,
    stages: [
      { name: "Scan", description: "Phone video of a vehicle into a metric 3D model.", status: { label: "Capture prep", state: "active" } },
      { name: "Segment", description: "The model split into individual components.", status: { label: "Tested on fixture", state: "partial" } },
      { name: "Track", description: "Nearby objects detected and tracked in 3D.", status: { label: "Built, awaiting capture", state: "waiting" } },
      { name: "Score", description: "Collision risk and time to contact, per component.", status: { label: "In progress", state: "active" } },
    ],
  },
  {
    slug: "apiary",
    name: "Apiary AI",
    year: "2026",
    description: "Governance and containment for developers running multiple AI coding agents at once.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenTelemetry"],
    status: { label: "Building", state: "active" },
  },
  {
    slug: "overstride",
    name: "Overstride",
    year: "2026",
    description: "Identifies the injured limb from running video: AUC 0.610 on motion capture, 0.583 on real video.",
    stack: ["Python", "PyTorch", "AthleticsPose", "AthletePose3D", "Google Colab"],
    status: { label: "Complete", state: "done" },
    repo: { owner: "AlvinKalaivannan", repo: "Overstride_V2" },
    href: "https://github.com/AlvinKalaivannan/Overstride_V2",
  },
  {
    slug: "bananamov",
    name: "BananaMOV",
    year: "2026",
    description: "Generates royalty-free music for any video using a VLM pipeline.",
    award: "Best Use of ElevenLabs, JAMHacks 10",
    stack: ["Next.js", "TypeScript", "Gemini 2.5 Flash", "ElevenLabs"],
    status: { label: "Complete", state: "done" },
  },
  {
    slug: "konnect",
    name: "Konnect",
    year: "2025",
    description: "Android app that notifies nearby users so they can meet up.",
    award: "Best Pitch, United Hacks V5",
    stack: ["Kotlin", "Java", "Android", "Supabase"],
    status: { label: "Complete", state: "done" },
  },
];

export const site = {
  name: "Alvin Kalaivannan",
  line: "Computer Engineering at UofT. I build CV and ML systems that flag risk before it turns into damage.",
  availability: "Open to summer 2027 internships",
  contactLine: "I'm looking for CV and ML internships for summer 2027. Email is the fastest way to reach me.",
  email: "alvinkalaivannan@gmail.com",
  github: "https://github.com/AlvinKalaivannan",
  linkedin: "https://linkedin.com/in/alvinkalaivannan",
  resume: "/resume.pdf",
};
