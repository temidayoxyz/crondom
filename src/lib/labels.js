// Maps cron expressions to human-readable labels.
// The raw syntax stays in the database for the scheduler.
// Only the friendly label shows in the UI.

const presetLabels = {
  "* * * * *": "Every minute",
  "*/5 * * * *": "Every 5 minutes",
  "*/10 * * * *": "Every 10 minutes",
  "*/15 * * * *": "Every 15 minutes",
  "*/30 * * * *": "Every 30 minutes",
  "0 * * * *": "Every hour",
  "0 */2 * * *": "Every 2 hours",
  "0 */4 * * *": "Every 4 hours",
  "0 */6 * * *": "Every 6 hours",
  "0 */8 * * *": "Every 8 hours",
  "0 */12 * * *": "Every 12 hours",
  "0 0 * * *": "Daily at midnight",
  "0 6 * * *": "Daily at 6 AM",
  "0 9 * * *": "Daily at 9 AM",
  "0 12 * * *": "Daily at noon",
  "0 18 * * *": "Daily at 6 PM",
  "0 0 * * 1": "Weekly on Monday",
  "0 0 * * 0": "Weekly on Sunday",
  "0 9 * * 1-5": "Weekdays at 9 AM",
  "0 0 1 * *": "Monthly on the 1st",
  "@reboot": "On every startup",
  "@daily": "Once daily",
  "@weekly": "Once weekly",
  "@monthly": "Once monthly",
};

export function cronLabel(expression) {
  return presetLabels[expression] || expression;
}

export const cronPresets = Object.entries(presetLabels).map(([value, label]) => ({
  value,
  label,
}));
