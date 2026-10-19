import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The machine's label. The only place mono appears on the site. */
export function Readout({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] bg-signal px-1.5 py-0.5 font-mono text-[11px] leading-[14px] font-medium tracking-[0.02em] whitespace-nowrap text-on-signal",
        className,
      )}
    >
      {children}
    </span>
  );
}
