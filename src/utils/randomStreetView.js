import { randomPointInUclaBounds } from "./uclaArea.js";

const RANDOM_STREET_VIEW_ATTEMPTS = 22;
const RANDOM_STREET_VIEW_RADIUS_METERS = 85;
const NODE_STREET_VIEW_RADIUS_METERS = 90;

function getPanoramaAsync(maps, service, request) {
  return new Promise((resolve) => {
    service.getPanorama(request, (data, status) => {
      if (status === maps.StreetViewStatus.OK && data?.location?.pano) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
}

function panoramaAnswerFromData(data, fallbackName = "Random UCLA Street View start") {
  const latLng = data.location.latLng;

  return {
    id: `street-view-${data.location.pano}`,
    name: fallbackName,
    latitude: latLng.lat(),
    longitude: latLng.lng(),
    type: "map",
    source: "google-street-view"
  };
}

export async function findRandomUclaStreetViewPanorama(maps) {
  const service = new maps.StreetViewService();

  for (let attempt = 0; attempt < RANDOM_STREET_VIEW_ATTEMPTS; attempt += 1) {
    const point = randomPointInUclaBounds();

    const data = await getPanoramaAsync(maps, service, {
      location: {
        lat: point.latitude,
        lng: point.longitude
      },
      radius: RANDOM_STREET_VIEW_RADIUS_METERS,
      source: maps.StreetViewSource.OUTDOOR
    });

    if (data) {
      return {
        data,
        answer: panoramaAnswerFromData(data),
        startMethod: "random"
      };
    }
  }

  return null;
}

export async function findNodeStreetViewPanorama(maps, node) {
  if (!node?.latitude || !node?.longitude) return null;

  const service = new maps.StreetViewService();

  if (node.streetViewPanoramaId) {
    const data = await getPanoramaAsync(maps, service, {
      pano: node.streetViewPanoramaId
    });

    if (data) {
      return {
        data,
        answer: panoramaAnswerFromData(data, node.name),
        startMethod: "programmed-node"
      };
    }

    // If the stored pano id is outdated, still try searching near the node.
  }

  const data = await getPanoramaAsync(maps, service, {
    location: {
      lat: node.latitude,
      lng: node.longitude
    },
    radius: NODE_STREET_VIEW_RADIUS_METERS,
    source: maps.StreetViewSource.OUTDOOR
  });

  if (!data) return null;

  return {
    data,
    answer: panoramaAnswerFromData(data, node.name),
    startMethod: "programmed-node"
  };
}
