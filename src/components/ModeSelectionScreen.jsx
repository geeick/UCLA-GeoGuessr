const modes = [
  {
    id: "picture",
    title: "Picture Mode",
    description: "Guess from still photos of UCLA buildings, interiors, landmarks, and campus details."
  },
  {
    id: "map",
    title: "Map Mode",
    description: "Explore from a campus starting point using Street View if configured, or fallback node navigation."
  },
  {
    id: "mixed",
    title: "Mixed Mode",
    description: "Each round randomly switches between Picture Mode and Map Mode."
  }
];

export default function ModeSelectionScreen({ onSelectMode, onBack }) {
  return (
    <main className="screen mode-screen">
      <section className="wide-card pop-in">
        <div className="screen-header">
          <div>
            <p className="eyebrow">Before you start</p>
            <h1>Choose Game Mode</h1>
          </div>
          <button className="ghost-button" onClick={onBack}>Back</button>
        </div>

        <div className="mode-grid">
          {modes.map((mode) => (
            <button key={mode.id} className="mode-card" onClick={() => onSelectMode(mode.id)}>
              <span>{mode.title}</span>
              <small>{mode.description}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
