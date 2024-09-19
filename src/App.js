import React, { useState } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const startGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
    setGameEnded(false);
  };

  const endGame = (finalScore, wrongAnswers) => {
    setScore(finalScore); // Atualiza a pontuação
    setIncorrectAnswers(wrongAnswers); // Atualiza a lista de erros
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
        <GameScreen onEndGame={endGame} playerName={playerName} />
      )}
      {gameEnded && (
        <EndScreen
          score={score}
          incorrectAnswers={incorrectAnswers}
          playerName={playerName}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default App;
