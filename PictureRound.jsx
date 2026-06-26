import { performanceMessage } from "../utils/scoring.js";

export default function EndScreen({ totalScore, onPlayAgain, onChooseMode }) {
  return (
    <main className="screen hero-screen">
      <section className="hero-card fade-in">
        <p className="eyebrow">Final Score</p>
        <h1>{totalScore.toLocaleString()}</h1>
        <p className="score-message">{performanceMessage(totalScore)}</p>
        <div className="button-row">
          <button className="primary-button" onClick={onPlayAgain}>Play Again</button>
          <button className="secondary-button" onClick={onChooseMode}>Choose Different Mode</button>
        </div>
      </section>
    </main>
  );
}
