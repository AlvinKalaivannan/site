import { getProjects } from "@/lib/github";
import { ProjectRow } from "@/components/project-row";
import { StageTrack } from "@/components/stage-track";
import { Contact, Footer, Hero, SiteNav, container } from "@/components/site-chrome";

const dateFormat = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Toronto" });

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.find((p) => p.featured && p.stages?.length);

  return (
    <>
      <SiteNav />
      <main id="top" className={container}>
        <Hero />

        <section id="work" aria-labelledby="work-h" className="pt-24">
          <h2 id="work-h" className="mb-8 text-[28px] leading-[34px] font-semibold tracking-[-0.02em]">
            What I&apos;m building
          </h2>
          <ul className="border-t border-line">
            {projects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </section>

        {featured?.stages && (
          <section id="current" aria-labelledby="current-h" className="pt-24">
            <h2 id="current-h" className="mb-4 text-[28px] leading-[34px] font-semibold tracking-[-0.02em]">
              Where {featured.name} is now
            </h2>
            <p className="mb-8 max-w-[640px] text-base leading-[26px] text-ink-muted">
              Four stages, built on a scan of a real vehicle and public driving datasets.
            </p>
            <StageTrack stages={featured.stages} current={featured.currentStage ?? 0} project={featured.name} />
            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {featured.href && (
                <a
                  href={featured.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base leading-[26px] text-ink underline decoration-line-strong underline-offset-4 hover:text-signal-ink hover:decoration-current"
                >
                  Follow the build on GitHub ↗
                </a>
              )}
              {featured.updatedAt && (
                <span className="text-sm leading-[22px] text-ink-muted">
                  Last updated {dateFormat.format(new Date(featured.updatedAt))}
                </span>
              )}
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </>
  );
}
