export function getRandomTimestamp(durationInDays: number = 30): Date {
  const now = Date.now(); // Current timestamp in milliseconds
  const randomOffset = Math.random() * durationInDays * 24 * 60 * 60 * 1000; // Random offset in milliseconds

  // Generate a random timestamp between now and the specified duration in the past
  const randomTimestamp = now - randomOffset;

  return new Date(randomTimestamp);
}

interface FormatDurationOptions {
  showSeconds: boolean;
}

export function formatDuration(
  seconds: number,
  options: FormatDurationOptions = { showSeconds: true }
): string {
  if (seconds < 0) throw new Error("Seconds cannot be negative");

  const { showSeconds } = options;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours} saat`);
  if (minutes > 0) parts.push(`${minutes} dakika`);
  if (showSeconds && (secs > 0 || parts.length === 0))
    parts.push(`${secs} saniye`);

  return parts.join(" ");
  //return !!parts.join(" ") ? parts.join(" ") : "";
}

/* export function formatDuration(seconds: number): string {
  if (seconds < 0) throw new Error("Seconds cannot be negative");

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (secs > 0 || parts.length === 0)
    parts.push(`${secs} second${secs > 1 ? "s" : ""}`);

  return parts.join(" ");
} */
