import React, { useState, useRef, useEffect } from "react";
import "./GameScreen.css"; // Importa o arquivo CSS para os botões numéricos

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, correctAnswer: num1 * num2 };
};

function GameScreen({ onEndGame, level, playerName }) {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [levelMultiplier, setLevelMultiplier] = useState(1);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (level === "Fácil") return 10;
    if (level === "Médio") return 6;
    return 4;
  });

  const inputRef = useRef(null);
  let timerRef = useRef(null);

  // Função para submeter a resposta
  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === question.correctAnswer;

    if (isCorrect) {
      setScore(score + Math.pow(2, levelMultiplier - 1));
      setLevelMultiplier(levelMultiplier + 1);
      setQuestion(generateQuestion());
      setUserAnswer("");
      setTimeLeft(() => {
        if (level === "Fácil") return 10;
        if (level === "Médio") return 6;
        return 4;
      });
    } else {
      // Enviar a pontuação ao backend quando o jogo terminar
      sendScore(playerName, level, score);
      onEndGame(
        score,
        level,
        question.num1,
        question.num2,
        question.correctAnswer,
      );
    }

    inputRef.current.focus();
  };

  // Função para detectar a tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Função para selecionar números com os botões
  const handleNumberClick = (number) => {
    setUserAnswer((prevAnswer) => prevAnswer + number);
  };

  const sendScore = async (name, level, score) => {
    try {
      const response = await fetch("http://localhost:3001/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, level, score }),
      });
      const data = await response.json();
      console.log("Resposta do servidor:", data);
    } catch (error) {
      console.error("Erro ao enviar pontuação:", error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerRef.current);
          sendScore(playerName, level, score); // Enviar a pontuação quando o tempo acabar
          onEndGame(
            score,
            level,
            question.num1,
            question.num2,
            question.correctAnswer,
          );
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [question, onEndGame, score, level]);

  return (
    <div className="game-screen">
      <h2>{`Pergunta: Quanto é ${question.num1} x ${question.num2}?`}</h2>
      <input
        type="tel"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)} // Permite digitar o resultado
        onKeyDown={handleKeyDown} // Permite submeter com Enter
        ref={inputRef}
      />
      <div className="number-buttons">
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>
        </div>
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
        </div>
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="number-button"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
        </div>
        <div className="number-row">
          <div className="spacer" />
          <button
            className="number-button"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <div className="spacer" />
        </div>
      </div>
      <button onClick={handleSubmit}>Enviar Resposta</button>
      <p>Pontuação Atual: {score}</p>
      <p>Tempo Restante: {timeLeft} segundos</p>
    </div>
  );
}

export default GameScreen;
