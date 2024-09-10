import React, { useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [playerName, setPlayerName] = useState("");

  const startGame = (name, level) => {
    setPlayerName(name);
    setLevel(level);
    setGameStarted(true);
    setGameEnded(false);
  };

  const endGame = (finalScore, level, num1, num2, correctAnswer) => {
    setScore(finalScore);
    setNum1(num1);
    setNum2(num2);
    setCorrectAnswer(correctAnswer);
    setGameStarted(false);
    setGameEnded(true);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setScore(0);
  };

  return (
    <div className="App">
      {!gameStarted && !gameEnded && <StartScreen onStartGame={startGame} />}
      {gameStarted && (
        <GameScreen onEndGame={endGame} level={level} playerName={playerName} />
      )}
      {gameEnded && (
        <EndScreen
          score={score}
          level={level}
          num1={num1}
          num2={num2}
          correctAnswer={correctAnswer}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default App;
