import React, { useEffect, useState } from "react";
import { fetchRanking } from "./rankingService";

function EndScreen({ score, onRestart, level }) {
  const [rankingFacil, setRankingFacil] = useState([]);
  const [rankingMedio, setRankingMedio] = useState([]);
  const [rankingGenio, setRankingGenio] = useState([]);

  // Função para carregar os rankings ao carregar a página
  useEffect(() => {
    const loadRankings = async () => {
      setRankingFacil(await fetchRanking("Fácil"));
      setRankingMedio(await fetchRanking("Médio"));
      setRankingGenio(await fetchRanking("Gênio"));
    };
    loadRankings();
  }, []);

  return (
    <div className="end-screen">
      <h1>Fim de Jogo!</h1>
      <p>Sua pontuação foi: {score}</p>
      <p>Você jogou no nível: {level}</p>
      <button onClick={onRestart}>Jogar Novamente</button>

      <div className="rankings">
        <h2>Ranking dos Top 10 Jogadores</h2>

        <div className="ranking-table">
          <h3>Nível Fácil</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingFacil.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ranking-table">
          <h3>Nível Médio</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingMedio.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ranking-table">
          <h3>Nível Gênio</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingGenio.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
