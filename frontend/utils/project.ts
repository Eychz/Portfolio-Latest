import { Clapperboard, Globe, Shirt, type LucideIcon } from "lucide-react"
import type { ProjectType } from "@/lib/types"

export const projectTypeMeta: Record<ProjectType, { label: string; icon: LucideIcon }> = {
  SYSTEM: { label: "System Project", icon: Globe },
  GRAPHIC_DESIGN: { label: "Graphic Design", icon: Shirt },
  EVENT_PRODUCTION: { label: "Event Production", icon: Clapperboard },
}

export function formatCategories(categories: string[]) {
  return categories.join(", ")
}

/** Unique categories across projects, in first-seen order, prefixed with "All". */
export function collectCategories(items: { categories: string[] }[]) {
  return ["All", ...new Set(items.flatMap((item) => item.categories))]
}
