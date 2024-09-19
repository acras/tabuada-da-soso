import React, { useState, useEffect } from "react";
import "./GameScreen.css";

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, correctAnswer: num1 * num2 };
};

function GameScreen({ onEndGame, playerName }) {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // Cronômetro de 1 minuto

  // Função para submeter a resposta
  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1); // Aumenta a pontuação para respostas corretas
    } else {
      setIncorrectAnswers([...incorrectAnswers, { ...question, userAnswer }]); // Registra a resposta errada
    }

    setQuestion(generateQuestion()); // Gera uma nova pergunta
    setUserAnswer(""); // Limpa a resposta
  };

  // Função para detectar teclas digitadas
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (/^\d$/.test(e.key)) {
      setUserAnswer((prevAnswer) => prevAnswer + e.key); // Adiciona o número digitado
    }
  };

  // Captura os eventos de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Limpa o evento ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userAnswer]);

  // Função para controlar o cronômetro
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          onEndGame(score, incorrectAnswers); // Envia a pontuação e os erros para a tela final
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, incorrectAnswers, onEndGame]);

  return (
    <div className="game-screen">
      <h2>{`Pergunta: Quanto é ${question.num1} x ${question.num2}?`}</h2>
      <div className="user-answer">
        <span>Resposta: {userAnswer || "_"}</span>
      </div>

      <div className="number-buttons">
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "1")}
          >
            1
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "2")}
          >
            2
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "3")}
          >
            3
          </button>
        </div>
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "4")}
          >
            4
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "5")}
          >
            5
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "6")}
          >
            6
          </button>
        </div>
        <div className="number-row">
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "7")}
          >
            7
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "8")}
          >
            8
          </button>
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "9")}
          >
            9
          </button>
        </div>
        <div className="number-row">
          <div className="spacer" />
          <button
            className="number-button"
            onClick={() => setUserAnswer((prev) => prev + "0")}
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
