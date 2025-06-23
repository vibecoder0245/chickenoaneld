const TIME_UNITS = [
  { unit: "year", seconds: 31536000 },
  { unit: "month", seconds: 2592000 },
  { unit: "week", seconds: 604800 },
  { unit: "day", seconds: 86400 },
  { unit: "hour", seconds: 3600 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
] as const

type TimeUnit = (typeof TIME_UNITS)[number]["unit"]

export function timeAgo(date: Date | string | number): string {
  const pastDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date
  const seconds = Math.floor((new Date().getTime() - pastDate.getTime()) / 1000)

  for (const { unit, seconds: unitSeconds } of TIME_UNITS) {
    const interval = Math.floor(seconds / unitSeconds)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`
    }
  }
  return "just now"
}
