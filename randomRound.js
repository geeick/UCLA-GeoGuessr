import { useMemo, useState } from "react";
import CampusMap from "./CampusMap.jsx";
import PictureRound from "./PictureRound.jsx";
import MapRound from "./MapRound.jsx";
import ResultPanel from "./ResultPanel.jsx";
import { getDistanceMeters } from "../utils/distance.js";
import { pointsFromDistance } from "../utils/scoring.js";

function answerForRound(round) {
  if (round.roundMode === "picture") {
    return {
      latitude: round.location.latitude,
      longitude: round.location.longitude,
    };
  }

  return {
    latitude: round.answerNode.latitude,
    longitude: round.answerNode.longitude,
  };
}

function readableMode(mode) {
  if (mode === "picture") return "Picture Mode";
  if (mode === "map") return "Map Mode";
  return "Mixed Mode";
}

export default function GameScreen({ rounds, mode, onGameEnd, onExitToModes }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const round = rounds[roundIndex];
  const answer = useMemo(() => answerForRound(round), [round]);
  const isLastRound = roundIndex === rounds.length - 1;

  function submitGuess() {
    if (!guess || submitted) return;

    const distanceMeters = getDistanceMeters(guess, answer);
    const points = pointsFromDistance(distanceMeters);
    const newTotal = totalScore + points;

    setLastResult({ distanceMeters, points });
    setTotalScore(newTotal);
    setSubmitted(true);
  }

  function nextRound() {
    if (isLastRound) {
      onGameEnd(totalScore);
      return;
    }

    setRoundIndex((current) => current + 1);
    setGuess(null);
    setSubmitted(false);
    setLastResult(null);
  }

  return (
    <main className="game-screen">
      <header className="game-header">
        <div>
          <p className="eyebrow">{readableMode(mode)}</p>
          <h1>BruinGuessr</h1>
        </div>
        <div className="header-stats">
          <span>Round {roundIndex + 1} / {rounds.length}</span>
          <span>Total: {totalScore.toLocaleString()}</span>
          <button className="ghost-button" onClick={onExitToModes}>Modes</button>
        </div>
      </header>

      <section className="game-layout">
        <div className="left-panel">
          {round.roundMode === "picture" ? (
            <PictureRound round={round} />
          ) : (
            <MapRound round={round} />
          )}

          <div className="submit-card">
            <p>
              {guess
                ? "Guess placed. Submit when you are ready."
                : "Click on the UCLA map to place your guess."}
            </p>
            <button className="primary-button" disabled={!guess || submitted} onClick={submitGuess}>
              Submit Guess
            </button>
          </div>
        </div>

        <div className="right-panel">
          <CampusMap
            guess={guess}
            answer={answer}
            showAnswer={submitted}
            onGuess={setGuess}
          />

          {submitted && lastResult && (
            <ResultPanel
              round={round}
              distanceMeters={lastResult.distanceMeters}
              points={lastResult.points}
              totalScore={totalScore}
              isLastRound={isLastRound}
              onNextRound={nextRound}
            />
          )}
        </div>
      </section>
    </main>
  );
}
