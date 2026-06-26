import { performanceMessage } from "../utils/scoring.js";

export default function EndScreen({ totalScore, onPlayAgain, onChooseMode }) {
  return (
    <main className="screen end-screen">
      <section className="hero-card pop-in">
        <p className="eyebrow">Final score</p>
        <h1>{totalScore.toLocaleString()}</h1>
        <h2>{performanceMessage(totalScore)}</h2>
        <p className="hero-text">
          20,000+ is True Bruin. 12,000+ is Pretty solid. Below that, you need a campus walk.
        </p>
        <div className="button-row">
          <button className="primary-button" onClick={onPlayAgain}>Play Again</button>
          <button className="secondary-button" onClick={onChooseMode}>Choose Different Mode</button>
        </div>
      </section>
    </main>
  );
}
