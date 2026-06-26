export function distanceMeters(pointA, pointB) {
  const earthRadiusMeters = 6371000;
  const lat1 = degreesToRadians(pointA.latitude);
  const lat2 = degreesToRadians(pointB.latitude);
  const deltaLat = degreesToRadians(pointB.latitude - pointA.latitude);
  const deltaLng = degreesToRadians(pointB.longitude - pointA.longitude);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
