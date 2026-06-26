export default function ResultPanel({
  round,
  distance,
  basePoints,
  speedMultiplier,
  elapsedSeconds,
  points,
  totalScore,
  onNextRound,
  isLastRound
}) {
  return (
    <aside className="result-panel pop-in">
      <p className="eyebrow">Round result</p>
      <p className="result-note">
        Correct location is marked on the map. The exact answer name stays hidden.
      </p>
      <p>
        Mode used: <strong>{round.roundType === "picture" ? "Picture Mode" : "Map Mode"}</strong>
      </p>

      <div className="stat-grid">
        <div>
          <span>Distance error</span>
          <strong>{Math.round(distance).toLocaleString()} m</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>{elapsedSeconds}s</strong>
        </div>
        <div>
          <span>Speed factor</span>
          <strong>{speedMultiplier.toFixed(2)}x</strong>
        </div>
        <div>
          <span>Distance score</span>
          <strong>{basePoints.toLocaleString()}</strong>
        </div>
        <div>
          <span>Round points</span>
          <strong>{points.toLocaleString()}</strong>
        </div>
        <div>
          <span>Total score</span>
          <strong>{totalScore.toLocaleString()}</strong>
        </div>
      </div>

      <button className="primary-button" onClick={onNextRound}>
        {isLastRound ? "See Final Score" : "Next Round"}
      </button>
    </aside>
  );
}
