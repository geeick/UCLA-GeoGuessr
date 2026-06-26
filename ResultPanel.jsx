const modes = [
  {
    id: "picture",
    title: "Picture Mode",
    description: "Guess from still images of UCLA interiors, landmarks, hallways, libraries, and campus details.",
  },
  {
    id: "map",
    title: "Map Mode",
    description: "Explore from a starting spot using Street View if configured, or fallback UCLA campus movement nodes.",
  },
  {
    id: "mixed",
    title: "Mixed Mode",
    description: "Every round randomly chooses Picture Mode or Map Mode.",
  },
];

export default function ModeSelectionScreen({ onChooseMode, onBack }) {
  return (
    <main className="screen mode-screen">
      <section className="wide-card fade-in">
        <button className="ghost-button small-button" onClick={onBack}>Back</button>
        <p className="eyebrow">BruinGuessr</p>
        <h1>Choose Game Mode</h1>
        <div className="mode-grid">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className="mode-card"
              onClick={() => onChooseMode(mode.id)}
            >
              <span>{mode.title}</span>
              <small>{mode.description}</small>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
