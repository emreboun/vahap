export function getRandomTimestamp(durationInDays: number = 30): Date {
  const now = Date.now(); // Current timestamp in milliseconds
  const randomOffset = Math.random() * durationInDays * 24 * 60 * 60 * 1000; // Random offset in milliseconds

  // Generate a random timestamp between now and the specified duration in the past
  const randomTimestamp = now - randomOffset;

  return new Date(randomTimestamp);
}

