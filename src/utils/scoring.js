export const FULL_SPEED_SECONDS = 20;
export const MAX_SCORING_SECONDS = 90;
export const MIN_SPEED_MULTIPLIER = 0.55;

export function basePointsFromDistance(distanceMeters) {
  return Math.max(0, Math.round(5000 * Math.exp(-distanceMeters / 250)));
}

export function speedMultiplierFromSeconds(elapsedSeconds) {
  const seconds = Math.max(0, Number(elapsedSeconds) || 0);

  // First 20 seconds keeps the full distance score.
  if (seconds <= FULL_SPEED_SECONDS) return 1;

  // After 90 seconds, the player keeps 55% of the distance score.
  if (seconds >= MAX_SCORING_SECONDS) return MIN_SPEED_MULTIPLIER;

  const progress = (seconds - FULL_SPEED_SECONDS) / (MAX_SCORING_SECONDS - FULL_SPEED_SECONDS);
  return 1 - progress * (1 - MIN_SPEED_MULTIPLIER);
}

export function pointsFromDistance(distanceMeters, elapsedSeconds = 0) {
  const basePoints = basePointsFromDistance(distanceMeters);
  const speedMultiplier = speedMultiplierFromSeconds(elapsedSeconds);

  return Math.max(0, Math.round(basePoints * speedMultiplier));
}

export function performanceMessage(totalScore) {
  if (totalScore >= 20000) return "True Bruin";
  if (totalScore >= 12000) return "Pretty solid";
  return "You need a campus walk";
}
