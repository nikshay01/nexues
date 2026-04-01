/**
 * Computed-field helpers used by pre-save hooks and route handlers.
 */

/**
 * Duration in minutes between two Date objects.
 */
function durationMinutes(start, end) {
  if (!start || !end) return null;
  const ms = new Date(end) - new Date(start);
  return ms > 0 ? Math.round(ms / 60000) : 0;
}

/**
 * Duration in hours (float) between two Date objects.
 */
function durationHours(start, end) {
  if (!start || !end) return null;
  const ms = new Date(end) - new Date(start);
  return ms > 0 ? parseFloat((ms / 3600000).toFixed(2)) : 0;
}

/**
 * Delta in minutes: actual minus target.
 * Positive = late / over, negative = early / under.
 * Compares only the time-of-day portion in minutes.
 */
function timeDeltaMinutes(actualDate, targetTimeStr) {
  if (!actualDate || !targetTimeStr) return null;
  const actual = new Date(actualDate);
  const [h, m] = targetTimeStr.split(':').map(Number);
  const actualMin = actual.getHours() * 60 + actual.getMinutes();
  const targetMin = h * 60 + m;
  return actualMin - targetMin;
}

/**
 * Sum an array of objects by a given numeric key.
 */
function sumByKey(arr, key) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, item) => acc + (Number(item[key]) || 0), 0);
}

/**
 * Autopilot percent = 100 - intentional percent.
 */
function autopilotPercent(intentional) {
  if (intentional == null) return null;
  return Math.max(0, Math.min(100, 100 - intentional));
}

/**
 * Completion percent = (logged / target) * 100.
 */
function completionPercent(logged, target) {
  if (!target || target === 0) return 0;
  return parseFloat(((logged / target) * 100).toFixed(1));
}

/**
 * Format hours as "Xhr Ymin" string.
 */
function formatHoursToHrMin(hours) {
  if (hours == null) return '';
  const h = Math.floor(Math.abs(hours));
  const m = Math.round((Math.abs(hours) - h) * 60);
  const sign = hours < 0 ? '-' : '';
  return `${sign}${h}hr ${m}min`;
}

module.exports = {
  durationMinutes,
  durationHours,
  timeDeltaMinutes,
  sumByKey,
  autopilotPercent,
  completionPercent,
  formatHoursToHrMin,
};
