export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
}

/** Remote images skip Next.js optimization since their hosts aren't allow-listed. */
export function isRemoteImage(src: string) {
  return /^https?:\/\//.test(src)
}

/** Splits "a, b, c" into ["a", "b", "c"], dropping blanks. */
export function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}
