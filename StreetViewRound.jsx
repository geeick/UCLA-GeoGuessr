const directions = [
  { key: "forward", label: "Forward" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
  { key: "back", label: "Back" },
];

export default function MovementControls({ connections = {}, onMove, disabled = false }) {
  return (
    <div className="movement-controls">
      {directions.map((direction) => {
        const targetId = connections[direction.key];
        return (
          <button
            key={direction.key}
            className="movement-button"
            disabled={disabled || !targetId}
            onClick={() => targetId && onMove(direction.key, targetId)}
          >
            {direction.label}
          </button>
        );
      })}
    </div>
  );
}
