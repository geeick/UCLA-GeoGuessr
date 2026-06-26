// UCLA campus bounds used for random Street View attempts and map limits.
// These are intentionally a little larger than the main campus so Google can
// find nearby outdoor panoramas, but still tight enough to keep rounds UCLA-focused.
export const UCLA_CENTER = {
  latitude: 34.0713,
  longitude: -118.4432
};

export const UCLA_BOUNDS = {
  south: 34.0648,
  west: -118.4527,
  north: 34.0794,
  east: -118.4338
};

export function randomPointInUclaBounds() {
  return {
    latitude: randomBetween(UCLA_BOUNDS.south, UCLA_BOUNDS.north),
    longitude: randomBetween(UCLA_BOUNDS.west, UCLA_BOUNDS.east)
  };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
