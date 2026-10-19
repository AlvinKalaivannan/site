import type { Project } from "@/lib/types";
import { StackChips, StatusBox } from "@/components/boxes";

export function ProjectRow({ project }: { project: Project }) {
  const title = project.fullName ? `${project.name} (${project.fullName})` : project.name;
  const body = (
    <div className="relative grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 overflow-hidden rounded-lg px-2 py-6 outline outline-1 -outline-offset-1 outline-transparent transition-[background-color,outline-color] duration-[160ms] group-hover:bg-paper-raised group-hover:outline-signal group-focus-visible:bg-paper-raised md:px-4">
      {/* Raspberry edge: grows down the left side on hover or keyboard focus. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-signal group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-safe:transition-transform motion-safe:duration-[160ms] motion-safe:ease-out"
      />
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
    <li className="ak-reveal -mx-2 border-b border-line last:border-b-0 md:-mx-4">
      {project.href ? (
        <a
          href={project.href}
          className="group block rounded-lg text-ink no-underline motion-safe:transition-transform motion-safe:duration-[120ms] motion-safe:active:scale-[0.99]"
          target="_blank"
          rel="noreferrer"
        >
          {body}
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}
