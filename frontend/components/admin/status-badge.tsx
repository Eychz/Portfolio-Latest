import { cn } from "@/lib/utils"

export function StatusBadge({ active, on, off }: { active: boolean; on: string; off: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        active ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-muted text-muted-foreground"
      )}
    >
      {active ? on : off}
    </span>
  )
}
