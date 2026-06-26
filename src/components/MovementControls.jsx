const directions = ["forward", "left", "right", "back"];

export default function MovementControls({ connections, onMove }) {
  return (
    <div className="movement-controls">
      {directions.map((direction) => {
        const targetId = connections?.[direction];
        return (
          <button
            key={direction}
            className="movement-button"
            disabled={!targetId}
            onClick={() => onMove(targetId)}
          >
            {direction}
          </button>
        );
      })}
    </div>
  );
}
