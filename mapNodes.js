import { useMemo, useState } from "react";
import { getMapNodeById } from "../data/mapNodes.js";
import ImageWithFallback from "./ImageWithFallback.jsx";
import MovementControls from "./MovementControls.jsx";

export default function FallbackMapRound({ round, onCurrentNodeChange }) {
  const [currentNodeId, setCurrentNodeId] = useState(round.startNode.id);
  const currentNode = useMemo(() => getMapNodeById(currentNodeId) || round.startNode, [currentNodeId, round.startNode]);

  function move(_direction, targetId) {
    const nextNode = getMapNodeById(targetId);
    if (!nextNode) return;
    setCurrentNodeId(nextNode.id);
    onCurrentNodeChange?.(nextNode);
  }

  return (
    <section className="clue-card fade-in">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Map Mode</p>
          <h2>Explore the campus view</h2>
        </div>
        <span className="mode-pill fallback-pill">Fallback Navigation</span>
      </div>

      <ImageWithFallback
        className="clue-image map-clue-image"
        src={currentNode.panoramaImageUrl || currentNode.imageUrl}
        alt={`Campus view near ${currentNode.name}`}
      />

      <div className="map-node-info">
        <span className="label">Current view</span>
        <strong>{currentNode.name}</strong>
        <p className="muted">Correct answer is the starting location, not necessarily your final view.</p>
      </div>

      <MovementControls connections={currentNode.connections} onMove={move} />
    </section>
  );
}
