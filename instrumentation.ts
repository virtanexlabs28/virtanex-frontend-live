/**
 * Runs once when the Next.js server starts. Makes the server's default time zone Finnish
 * so logs and any Date formatting without an explicit zone use Helsinki time.
 */
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    process.env.TZ = 'Europe/Helsinki';
  }
}
