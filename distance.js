import { useEffect, useRef, useState } from "react";
import { getGoogleMapsApiKey, loadGoogleMapsScript } from "../utils/streetViewAvailable.js";

function closestStreetViewLink(links, desiredHeading) {
  if (!links?.length) return null;

  return links.reduce((best, link) => {
    const difference = Math.abs((((link.heading - desiredHeading) % 360) + 540) % 360 - 180);
    if (!best || difference < best.difference) {
      return { link, difference };
    }
    return best;
  }, null)?.link;
}

export default function StreetViewRound({ round, onUnavailable }) {
  const containerRef = useRef(null);
  const panoramaRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [heading, setHeading] = useState(round.startNode.heading || 0);

  useEffect(() => {
    let cancelled = false;

    async function setupStreetView() {
      try {
        const maps = await loadGoogleMapsScript(getGoogleMapsApiKey());

        if (cancelled || !containerRef.current) return;

        const service = new maps.StreetViewService();
        const position = {
          lat: round.startNode.latitude,
          lng: round.startNode.longitude,
        };

        service.getPanorama(
          {
            location: position,
            radius: 80,
            preference: maps.StreetViewPreference.NEAREST,
            source: maps.StreetViewSource.OUTDOOR,
          },
          (data, streetViewStatus) => {
            if (cancelled) return;

            if (streetViewStatus !== maps.StreetViewStatus.OK || !data?.location?.pano) {
              setStatus("unavailable");
              onUnavailable?.();
              return;
            }

            panoramaRef.current = new maps.StreetViewPanorama(containerRef.current, {
              pano: round.startNode.streetViewPanoramaId || data.location.pano,
              pov: {
                heading: round.startNode.heading || 0,
                pitch: round.startNode.pitch || 0,
              },
              zoom: 1,
              addressControl: false,
              fullscreenControl: false,
              motionTracking: false,
              motionTrackingControl: false,
              showRoadLabels: false,
            });

            panoramaRef.current.addListener("pov_changed", () => {
              setHeading(panoramaRef.current.getPov().heading || 0);
            });

            setStatus("ready");
          }
        );
      } catch (error) {
        console.warn(error);
        setStatus("unavailable");
        onUnavailable?.();
      }
    }

    setupStreetView();

    return () => {
      cancelled = true;
    };
  }, [round, onUnavailable]);

  function rotate(amount) {
    const panorama = panoramaRef.current;
    if (!panorama) return;
    const pov = panorama.getPov();
    panorama.setPov({ ...pov, heading: (pov.heading + amount + 360) % 360 });
  }

  function moveForward() {
    const panorama = panoramaRef.current;
    if (!panorama) return;
    const link = closestStreetViewLink(panorama.getLinks(), panorama.getPov().heading);
    if (link?.pano) {
      panorama.setPano(link.pano);
    }
  }

  return (
    <section className="clue-card fade-in">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Map Mode</p>
          <h2>Explore the campus view</h2>
        </div>
        <span className="mode-pill street-pill">Google Street View</span>
      </div>

      <div className="street-view-frame" ref={containerRef}>
        {status === "loading" && (
          <div className="street-view-message">Loading Street View...</div>
        )}
        {status === "unavailable" && (
          <div className="street-view-message">Street View unavailable. Switching to fallback navigation.</div>
        )}
      </div>

      <div className="street-controls">
        <button className="movement-button" disabled={status !== "ready"} onClick={() => rotate(-45)}>Rotate Left</button>
        <button className="movement-button" disabled={status !== "ready"} onClick={moveForward}>Forward</button>
        <button className="movement-button" disabled={status !== "ready"} onClick={() => rotate(45)}>Rotate Right</button>
      </div>

      <p className="muted street-note">
        Street View is optional. If this fails or has poor campus coverage, BruinGuessr uses the fallback campus navigation system.
        Current heading: {Math.round(heading)}°.
      </p>
    </section>
  );
}
