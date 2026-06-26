import { useEffect, useRef, useState } from "react";
import { getGoogleMapsApiKey } from "../utils/streetViewAvailable.js";
import {
  findNodeStreetViewPanorama,
  findRandomUclaStreetViewPanorama
} from "../utils/randomStreetView.js";

let googleMapsPromise = null;

function loadGoogleMapsScript(apiKey) {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

export default function StreetViewRound({
  node,
  preferRandomStart = true,
  onAnswerChange,
  onReady,
  onStreetViewUnavailable
}) {
  const panoramaRef = useRef(null);
  const [status, setStatus] = useState("Loading Google Street View...");
  const [startLabel, setStartLabel] = useState("Finding a random UCLA Street View start...");

  useEffect(() => {
    let cancelled = false;
    const apiKey = getGoogleMapsApiKey();

    async function setupStreetView() {
      try {
        const maps = await loadGoogleMapsScript(apiKey);
        if (cancelled || !panoramaRef.current) return;

        const pov = {
          heading: node.heading ?? 0,
          pitch: node.pitch ?? 0
        };

        let panoramaResult = null;

        if (preferRandomStart) {
          setStatus("Searching for random UCLA Street View...");
          panoramaResult = await findRandomUclaStreetViewPanorama(maps);
        }

        if (!panoramaResult) {
          setStatus("Trying programmed UCLA Street View location...");
          panoramaResult = await findNodeStreetViewPanorama(maps, node);
        }

        if (cancelled) return;

        if (!panoramaResult) {
          setStatus("Street View unavailable. Switching to fallback mode.");
          onStreetViewUnavailable();
          return;
        }

        new maps.StreetViewPanorama(panoramaRef.current, {
          pano: panoramaResult.data.location.pano,
          pov,
          zoom: 1,
          addressControl: false,
          fullscreenControl: false,
          linksControl: true,
          panControl: true,
          motionTracking: false,
          motionTrackingControl: false
        });

        onAnswerChange(panoramaResult.answer);
        onReady();

        if (panoramaResult.startMethod === "random") {
          setStatus("Using random real Google Street View");
          setStartLabel("Your starting spot was randomly chosen on or near UCLA campus.");
        } else {
          setStatus("Using real Google Street View");
          setStartLabel("Your starting spot came from a programmed UCLA Street View search.");
        }
      } catch (error) {
        console.warn("Street View failed. Falling back to campus-node mode.", error);
        if (!cancelled) onStreetViewUnavailable();
      }
    }

    setupStreetView();

    return () => {
      cancelled = true;
    };
  }, [node, preferRandomStart, onAnswerChange, onReady, onStreetViewUnavailable]);

  return (
    <section className="clue-card">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Map Mode</p>
          <h2>Explore the campus view</h2>
        </div>
        <span className="pill streetview-pill">{status}</span>
      </div>

      <div className="street-view-box" ref={panoramaRef}>
        <div className="image-placeholder">
          <div>
            <strong>Loading Street View</strong>
            <span>If unavailable, BruinGuessr will switch to fallback navigation.</span>
          </div>
        </div>
      </div>

      <div className="node-info">
        <span>Starting area</span>
        <strong>{preferRandomStart ? "Random UCLA Street View" : node.name}</strong>
        <p>{startLabel}</p>
        <small>Guess the starting location, not wherever you move afterward.</small>
      </div>
    </section>
  );
}
