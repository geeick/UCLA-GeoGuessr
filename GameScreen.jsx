export default function ResultPanel({ round, distanceMeters, points, totalScore, isLastRound, onNextRound }) {
  const locationName = round.roundMode === "picture"
    ? round.location.name
    : round.answerNode.name;

  const modeLabel = round.roundMode === "picture" ? "Picture Mode" : "Map Mode";

  return (
    <aside className="result-panel slide-up">
      <div>
        <p className="eyebrow">Round Result</p>
        <h2>{locationName}</h2>
        <p className="muted">This round used {modeLabel}.</p>
      </div>

      <div className="result-stats">
        <div>
          <span className="label">Distance</span>
          <strong>{Math.round(distanceMeters).toLocaleString()} m</strong>
        </div>
        <div>
          <span className="label">Points</span>
          <strong>{points.toLocaleString()}</strong>
        </div>
        <div>
          <span className="label">Total</span>
          <strong>{totalScore.toLocaleString()}</strong>
        </div>
      </div>

      <button className="primary-button" onClick={onNextRound}>
        {isLastRound ? "See Final Score" : "Next Round"}
      </button>
    </aside>
  );
}
