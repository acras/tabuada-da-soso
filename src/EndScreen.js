import React from "react";

function EndScreen({ score, incorrectAnswers = [], onRestart }) {
  // Valor padrão como array vazio
  return (
    <div className="end-screen">
      <h1>Fim de Jogo!</h1>
      <p>Sua pontuação: {score}</p>
      <p>Respostas erradas: {incorrectAnswers.length}</p>

      <h3>Multiplicações que você errou:</h3>
      <ul>
        {incorrectAnswers.map((error, index) => (
          <li key={index}>
            {`${error.num1} x ${error.num2} = ${error.correctAnswer} (você respondeu: ${error.userAnswer})`}
          </li>
        ))}
      </ul>

      <button onClick={onRestart}>Jogar Novamente</button>
    </div>
  );
}

export default EndScreen;
