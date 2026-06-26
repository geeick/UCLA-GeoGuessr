import { useCallback, useEffect, useMemo, useState } from "react";
import CampusMap from "./CampusMap.jsx";
import PictureRound from "./PictureRound.jsx";
import MapRound from "./MapRound.jsx";
import ResultPanel from "./ResultPanel.jsx";
import { createRounds } from "../utils/randomRound.js";
import { distanceMeters } from "../utils/distance.js";
import {
  basePointsFromDistance,
  pointsFromDistance,
  speedMultiplierFromSeconds
} from "../utils/scoring.js";

export default function GameScreen({ mode, onGameOver, onExit }) {
  const rounds = useMemo(() => createRounds(mode), [mode]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [roundFinished, setRoundFinished] = useState(false);
  const [roundStartedAt, setRoundStartedAt] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [clueReady, setClueReady] = useState(false);
  const [dynamicAnswer, setDynamicAnswer] = useState(null);
  const [lastDistance, setLastDistance] = useState(0);
  const [lastBasePoints, setLastBasePoints] = useState(0);
  const [lastSpeedMultiplier, setLastSpeedMultiplier] = useState(1);
  const [lastElapsedSeconds, setLastElapsedSeconds] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const currentRound = rounds[roundIndex];
  const currentAnswer = dynamicAnswer || currentRound.answer;
  const modeLabel = mode === "picture" ? "Picture Mode" : mode === "map" ? "Map Mode" : "Mixed Mode";
  const isLastRound = roundIndex === rounds.length - 1;

  useEffect(() => {
    setRoundStartedAt(Date.now());
    setElapsedSeconds(0);
    setGuess(null);
    setRoundFinished(false);
    setDynamicAnswer(null);
    setClueReady(currentRound.roundType === "picture");
  }, [roundIndex, currentRound.roundType]);

  useEffect(() => {
    if (roundFinished || !clueReady) return undefined;

    const timerId = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - roundStartedAt) / 1000));
    }, 500);

    return () => window.clearInterval(timerId);
  }, [clueReady, roundFinished, roundStartedAt]);

  const handleMapAnswerChange = useCallback((answer) => {
    setDynamicAnswer(answer);
  }, []);

  const handleMapReady = useCallback(() => {
    setRoundStartedAt(Date.now());
    setElapsedSeconds(0);
    setClueReady(true);
  }, []);

  function submitGuess() {
    if (!guess || roundFinished || !clueReady || !currentAnswer) return;

    const finalElapsedSeconds = Math.max(0, Math.round((Date.now() - roundStartedAt) / 1000));
    const distance = distanceMeters(guess, currentAnswer);
    const basePoints = basePointsFromDistance(distance);
    const speedMultiplier = speedMultiplierFromSeconds(finalElapsedSeconds);
    const points = pointsFromDistance(distance, finalElapsedSeconds);

    setElapsedSeconds(finalElapsedSeconds);
    setLastDistance(distance);
    setLastBasePoints(basePoints);
    setLastSpeedMultiplier(speedMultiplier);
    setLastElapsedSeconds(finalElapsedSeconds);
    setLastPoints(points);
    setTotalScore((previousScore) => previousScore + points);
    setRoundFinished(true);
  }

  function goNext() {
    const nextTotal = totalScore;

    if (isLastRound) {
      onGameOver(nextTotal);
      return;
    }

    setRoundIndex((current) => current + 1);
    setLastDistance(0);
    setLastBasePoints(0);
    setLastSpeedMultiplier(1);
    setLastElapsedSeconds(0);
    setLastPoints(0);
  }

  return (
    <main className="game-shell">
      <header className="game-header">
        <div>
          <p className="eyebrow">BruinGuessr</p>
          <h1>{modeLabel}</h1>
        </div>
        <div className="game-meta">
          <span>Round {roundIndex + 1} / {rounds.length}</span>
          <span>{clueReady ? `Time: ${elapsedSeconds}s` : "Loading clue..."}</span>
          <span>Score: {totalScore.toLocaleString()}</span>
          <button className="ghost-button" onClick={onExit}>Change Mode</button>
        </div>
      </header>

      <section className="game-grid">
        <div className="left-column">
          {currentRound.roundType === "picture" ? (
            <PictureRound location={currentRound.clue} />
          ) : (
            <MapRound
              startingNode={currentRound.clue}
              onAnswerChange={handleMapAnswerChange}
              onReady={handleMapReady}
            />
          )}
        </div>

        <div className="right-column">
          <CampusMap
            guess={guess}
            answer={currentAnswer}
            roundFinished={roundFinished}
            onGuess={setGuess}
          />

          {!roundFinished ? (
            <div className="submit-card">
              <p>
                {!clueReady
                  ? "Loading the round. You can look around once the clue appears."
                  : guess
                    ? "Ready to submit? Faster guesses keep more points."
                    : "Click the map to place your guess. Speed now affects your score."}
              </p>
              <button
                className="primary-button"
                disabled={!guess || !clueReady}
                onClick={submitGuess}
              >
                Submit Guess
              </button>
            </div>
          ) : (
            <ResultPanel
              round={currentRound}
              distance={lastDistance}
              basePoints={lastBasePoints}
              speedMultiplier={lastSpeedMultiplier}
              elapsedSeconds={lastElapsedSeconds}
              points={lastPoints}
              totalScore={totalScore}
              onNextRound={goNext}
              isLastRound={isLastRound}
            />
          )}
        </div>
      </section>
    </main>
  );
}
