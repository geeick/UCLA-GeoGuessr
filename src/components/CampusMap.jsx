import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { UCLA_BOUNDS, UCLA_CENTER } from "../utils/uclaArea.js";

const MAP_CENTER = [UCLA_CENTER.latitude, UCLA_CENTER.longitude];
const MAP_BOUNDS = [
  [UCLA_BOUNDS.south, UCLA_BOUNDS.west],
  [UCLA_BOUNDS.north, UCLA_BOUNDS.east]
];

const guessIcon = L.divIcon({
  className: "custom-map-marker guess-map-marker",
  html: "<span>?</span>",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const correctIcon = L.divIcon({
  className: "custom-map-marker correct-map-marker",
  html: "<span>✓</span>",
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

function MapClickHandler({ disabled, onGuess }) {
  useMapEvents({
    click(event) {
      if (disabled) return;
      onGuess({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng
      });
    }
  });

  return null;
}

export default function CampusMap({ guess, answer, roundFinished, onGuess }) {
  const guessPosition = guess ? [guess.latitude, guess.longitude] : null;
  const answerPosition = answer ? [answer.latitude, answer.longitude] : null;

  return (
    <section className="map-card">
      <div className="map-topbar">
        <strong>Click your guess on the UCLA map</strong>
        <span>{guess ? "Guess placed" : "No guess yet"}</span>
      </div>

      <MapContainer
        center={MAP_CENTER}
        zoom={17}
        minZoom={15}
        maxZoom={22}
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom
        className="campus-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={22}
        />

        <MapClickHandler disabled={roundFinished} onGuess={onGuess} />

        {guessPosition && <Marker position={guessPosition} icon={guessIcon} />}
        {roundFinished && answerPosition && <Marker position={answerPosition} icon={correctIcon} />}
        {roundFinished && guessPosition && answerPosition && (
          <Polyline positions={[guessPosition, answerPosition]} />
        )}
      </MapContainer>
    </section>
  );
}
