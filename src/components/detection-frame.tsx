import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Readout } from "@/components/readout";

const corner = "absolute size-3 border-0 border-solid border-signal";

/** The signature: four square corners and a readout that lock onto a real object. */
export function DetectionFrame({
  label,
  locked = false,
  draw = false,
  className,
  children,
}: {
  label: string;
  /** Always drawn (hero name, featured project, current stage). */
  locked?: boolean;
  /** Draw in once after load. Only the hero uses this. */
  draw?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("ak-frame relative", className)} data-locked={locked || undefined} data-draw={draw || undefined}>
      <span aria-hidden="true" className="ak-mark pointer-events-none absolute -inset-2">
        <span className={cn(corner, "top-0 left-0 border-t-2 border-l-2")} />
        <span className={cn(corner, "top-0 right-0 border-t-2 border-r-2")} />
        <span className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
        <span className={cn(corner, "right-0 bottom-0 border-r-2 border-b-2")} />
        <Readout className="absolute bottom-full left-0 mb-1">{label}</Readout>
      </span>
      {children}
    </div>
  );
}
