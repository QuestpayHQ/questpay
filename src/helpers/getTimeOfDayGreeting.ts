/**
 * Returns a greeting phrase based on the user's local clock.
 * Pass `now` for tests or SSR with a fixed instant.
 *
 * Ranges (local hour): morning 5–11, afternoon 12–16, evening 17–21, night 22–4.
 */
export function getTimeOfDayGreeting(now: Date = new Date()): string {
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  }
  if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  }
  if (hour >= 17 && hour < 22) {
    return "Good evening";
  }
  return "Good night";
}
