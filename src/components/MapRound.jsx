import { useCallback, useEffect, useMemo, useState } from "react";
import { mapNodes } from "../data/mapNodes.js";
import { streetViewAvailable } from "../utils/streetViewAvailable.js";
import StreetViewRound from "./StreetViewRound.jsx";
import FallbackMapRound from "./FallbackMapRound.jsx";

export default function MapRound({ startingNode, onAnswerChange, onReady }) {
  const [currentNodeId, setCurrentNodeId] = useState(startingNode.id);
  const [forceFallback, setForceFallback] = useState(false);

  useEffect(() => {
    setCurrentNodeId(startingNode.id);
    setForceFallback(false);
  }, [startingNode]);

  const currentNode = useMemo(() => {
    return mapNodes.find((node) => node.id === currentNodeId) || startingNode;
  }, [currentNodeId, startingNode]);

  const handleStreetViewUnavailable = useCallback(() => {
    setForceFallback(true);
  }, []);

  const canTryStreetView = !forceFallback && streetViewAvailable(startingNode);

  useEffect(() => {
    if (canTryStreetView) return;

    // Fallback navigation uses your programmed nodes, so the answer is the original start node.
    onAnswerChange(startingNode);
    onReady();
  }, [canTryStreetView, onAnswerChange, onReady, startingNode]);

  if (canTryStreetView) {
    return (
      <StreetViewRound
        node={startingNode}
        preferRandomStart
        onAnswerChange={onAnswerChange}
        onReady={onReady}
        onStreetViewUnavailable={handleStreetViewUnavailable}
      />
    );
  }

  return (
    <FallbackMapRound
      currentNode={currentNode}
      startingNode={startingNode}
      onMove={setCurrentNodeId}
    />
  );
}
