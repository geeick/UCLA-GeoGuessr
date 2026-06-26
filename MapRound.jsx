import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";

const UCLA_CENTER = [34.0712, -118.4437];
const UCLA_BOUNDS = [
  [34.0666, -118.4508],
  [34.0776, -118.4365],
];

// Fix default Leaflet marker icons in Vite.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapClickHandler({ onGuess }) {
  useMapEvents({
    click(event) {
      onGuess({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function CampusMap({ guess, answer, showAnswer, onGuess }) {
  return (
    <div className="campus-map-card">
      <MapContainer
        center={UCLA_CENTER}
        zoom={16}
        minZoom={15}
        maxZoom={19}
        maxBounds={UCLA_BOUNDS}
        maxBoundsViscosity={0.95}
        scrollWheelZoom
        className="campus-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!showAnswer && <MapClickHandler onGuess={onGuess} />}

        {guess && <Marker position={[guess.latitude, guess.longitude]} />}

        {showAnswer && answer && (
          <>
            <Marker position={[answer.latitude, answer.longitude]} />
            {guess && (
              <Polyline
                positions={[
                  [guess.latitude, guess.longitude],
                  [answer.latitude, answer.longitude],
                ]}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
}
