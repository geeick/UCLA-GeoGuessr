import { useState } from "react";
import { hasGoogleMapsApiKey } from "../utils/streetViewAvailable.js";
import StreetViewRound from "./StreetViewRound.jsx";
import FallbackMapRound from "./FallbackMapRound.jsx";

export default function MapRound({ round }) {
  const [forceFallback, setForceFallback] = useState(false);
  const useStreetView = hasGoogleMapsApiKey() && !forceFallback;

  if (useStreetView) {
    return (
      <StreetViewRound
        round={round}
        onUnavailable={() => setForceFallback(true)}
      />
    );
  }

  return <FallbackMapRound round={round} />;
}
