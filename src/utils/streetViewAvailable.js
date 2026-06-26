export function getGoogleMapsApiKey() {
  // Vite only exposes variables that start with VITE_ to browser code.
  // Add this to a local .env file if you want to try real Google Street View:
  // VITE_GOOGLE_MAPS_API_KEY=your_key_here
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
}

export function streetViewAvailable(node) {
  const hasKey = Boolean(getGoogleMapsApiKey());
  const hasLocation = Boolean(node?.latitude && node?.longitude);
  return hasKey && hasLocation;
}
