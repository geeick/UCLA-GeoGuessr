import { useState } from "react";
import HomeScreen from "./components/HomeScreen.jsx";
import ModeSelectionScreen from "./components/ModeSelectionScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";
import EndScreen from "./components/EndScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  function startMode(selectedMode) {
    setMode(selectedMode);
    setFinalScore(0);
    setScreen("game");
  }

  function finishGame(score) {
    setFinalScore(score);
    setScreen("end");
  }

  if (screen === "home") {
    return <HomeScreen onStart={() => setScreen("mode")} />;
  }

  if (screen === "mode") {
    return <ModeSelectionScreen onSelectMode={startMode} onBack={() => setScreen("home")} />;
  }

  if (screen === "game") {
    return <GameScreen mode={mode} onGameOver={finishGame} onExit={() => setScreen("mode")} />;
  }

  return (
    <EndScreen
      totalScore={finalScore}
      onPlayAgain={() => startMode(mode)}
      onChooseMode={() => setScreen("mode")}
    />
  );
}
