import React, { useState, useEffect } from "react";
import "./GameScreen.css";

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, correctAnswer: num1 * num2 };
};

function GameScreen({ onEndGame, level }) {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [levelMultiplier, setLevelMultiplier] = useState(1);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (level === "Fácil") return 10;
    if (level === "Médio") return 6;
    return 4;
  });

  // Função para submeter a resposta
  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === question.correctAnswer;

    if (isCorrect) {
      setScore(score + Math.pow(2, levelMultiplier - 1));
      setLevelMultiplier(levelMultiplier + 1);
      setQuestion(generateQuestion());
      setUserAnswer(""); // Limpa a resposta
      setTimeLeft(() => {
        if (level === "Fácil") return 10;
        if (level === "Médio") return 6;
        return 4;
      });
    } else {
      onEndGame(
        score,
        level,
        question.num1,
        question.num2,
        question.correctAnswer,
      );
    }
  };

  // Função para detectar teclas digitadas
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (/^\d$/.test(e.key)) {
      setUserAnswer((prevAnswer) => prevAnswer + e.key); // Adiciona o número digitado
    }
  };

  // Função para selecionar números com os botões
  const handleNumberClick = (number) => {
    setUserAnswer((prevAnswer) => prevAnswer + number);
  };

  // Captura os eventos de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Limpa o evento ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userAnswer]);

  // Função para controlar o temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
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

    return () => clearInterval(timer);
  }, [question, onEndGame, score, level]);

  return (
    <div className="game-screen">
      <h2>{`Pergunta: Quanto é ${question.num1} x ${question.num2}?`}</h2>
      <div className="user-answer">
        <span>Resposta: {userAnswer || "_"}</span>{" "}
        {/* Mostra o que foi digitado */}
      </div>

      <div className="number-buttons">
        {/* Botões de números */}
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
