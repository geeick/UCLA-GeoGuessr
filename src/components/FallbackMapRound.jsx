import CampusImage from "./CampusImage.jsx";
import MovementControls from "./MovementControls.jsx";

export default function FallbackMapRound({ currentNode, startingNode, onMove }) {
  return (
    <section className="clue-card">
      <div className="clue-header">
        <div>
          <p className="eyebrow">Map Mode</p>
          <h2>Explore the campus view</h2>
        </div>
        <span className="pill fallback-pill">Fallback campus navigation</span>
      </div>

      <div className="clue-image-frame panorama-frame">
        <CampusImage
          src={currentNode.panoramaImageUrl || currentNode.imageUrl}
          alt={`Campus view near ${currentNode.name}`}
          label="Add UCLA campus view here"
        />
      </div>

      <div className="node-info">
        <span>Current view</span>
        <strong>{currentNode.name}</strong>
        <p>The answer is the starting location, not necessarily your final explored location.</p>
        <small>Starting point: {startingNode.name}</small>
      </div>

      <MovementControls connections={currentNode.connections} onMove={onMove} />
    </section>
  );
}
