import type { Status, StatusState } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusColors: Record<StatusState, string> = {
  active: "bg-status-active-bg text-status-active-fg",
  partial: "bg-status-partial-bg text-status-partial-fg",
  waiting: "bg-status-waiting-bg text-status-waiting-fg",
  done: "bg-status-done-bg text-status-done-fg",
};

const box = "inline-block rounded px-2 py-0.5 text-xs leading-[18px] font-medium whitespace-nowrap";

/** Where the work stands, in the Calm spectrum. Always tinted, never dark. */
export function StatusBox({ status, className }: { status: Status; className?: string }) {
  return <span className={cn(box, statusColors[status.state], className)}>{status.label}</span>;
}

/** One tool from a stack. Always dark, never colored. */
export function StackChip({ children }: { children: string }) {
  return <span className={cn(box, "bg-ink text-paper")}>{children}</span>;
}

export function StackChips({ stack, className }: { stack: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Stack">
      {stack.map((tool) => (
        <li key={tool}>
          <StackChip>{tool}</StackChip>
        </li>
      ))}
    </ul>
  );
}
