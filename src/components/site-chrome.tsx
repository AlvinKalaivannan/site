import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site } from "@/content/projects";

const container = "mx-auto max-w-[1080px] px-4 md:px-12";

export function SiteNav() {
  return (
    <nav aria-label="Main" className="border-b border-line">
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a href="#top" className="text-lg leading-none font-semibold tracking-[-0.03em] text-ink no-underline">
          AK
        </a>
        <div className="flex gap-6 text-sm leading-[22px]">
          <a href="#work" className="font-medium text-ink no-underline">Work</a>
          <a href="#contact" className="text-ink-muted no-underline transition-colors duration-[160ms] hover:text-ink">Contact</a>
          <a href={site.resume} className="text-ink-muted no-underline transition-colors duration-[160ms] hover:text-ink" target="_blank" rel="noreferrer">
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

const button =
  "inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium no-underline transition-[color,background-color,box-shadow,transform] duration-[120ms] motion-safe:active:scale-[0.98]";

export function Hero() {
  return (
    <section aria-label="Intro" className="pt-24">
      <h1 className="m-0 text-[clamp(44px,8vw,72px)] leading-[0.95] font-semibold tracking-[-0.035em]">{site.name}</h1>
      <p className="mt-6 max-w-[640px] text-lg leading-[30px] text-ink-muted">{site.line}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a href={`mailto:${site.email}`} className={`${button} bg-ink text-paper hover:bg-signal hover:text-on-signal`}>
          Email me
        </a>
        <a
          href={site.resume}
          className={`${button} text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-paper-raised hover:shadow-[inset_0_0_0_1px_var(--signal)]`}
          target="_blank"
          rel="noreferrer"
        >
          Resume ↗
        </a>
        <span className="inline-flex items-center gap-2 text-sm leading-[22px] text-ok">
          <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
          {site.availability}
        </span>
      </div>
    </section>
  );
}

const link =
  "inline-flex items-center gap-2 text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[160ms] hover:text-signal-ink hover:decoration-current";

/** Hairline between sections: 48px above, 48px below, 96px apart overall. */
export const sectionDivide = "mt-12 border-t border-line pt-12";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className={`${sectionDivide} pb-24`}>
      <h2 id="contact-h" className="mb-4 text-[28px] leading-[34px] font-semibold tracking-[-0.02em]">Get in touch</h2>
      <p className="mb-6 max-w-[640px] text-base leading-[26px] text-ink-muted">{site.contactLine}</p>
      <div className="flex flex-wrap gap-6 text-base leading-[26px]">
        <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
        <a href={site.github} className={link} target="_blank" rel="noreferrer">
          <FaGithub aria-hidden="true" className="size-4" />
          GitHub ↗
        </a>
        <a href={site.linkedin} className={link} target="_blank" rel="noreferrer">
          <FaLinkedin aria-hidden="true" className="size-4" />
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-wrap justify-between gap-4 py-6 text-sm leading-[22px] text-ink-muted`}>
        <span>{site.name}, 2026</span>
        <span>Built with Next.js and a design system of my own.</span>
      </div>
    </footer>
  );
}

export { container };
