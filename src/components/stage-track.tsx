import type { Stage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusBox } from "@/components/boxes";

/** A project's pipeline as an open progress track. Bars fill up to the current stage. */
export function StageTrack({ stages, current }: { stages: Stage[]; current: number }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {stages.map((stage, i) => (
        <li key={stage.name} aria-current={i === current ? "step" : undefined} className="flex flex-col gap-1.5 pt-4 pb-1">
          <span aria-hidden="true" className={cn("mb-2.5 h-0.5", i <= current ? "bg-signal" : "bg-line")} />
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm leading-[22px] text-ink-muted">{i + 1}</span>
            <span className="text-xl leading-7 font-semibold tracking-[-0.01em]">{stage.name}</span>
            <StatusBox status={stage.status} />
          </span>
          <span className="text-base leading-[26px] text-ink-muted">{stage.description}</span>
        </li>
      ))}
    </ol>
  );
}
