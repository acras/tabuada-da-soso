import React, { useState, useEffect } from "react";
import { fetchRanking } from "./rankingService";

function StartScreen({ onStartGame }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
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

  const handleStart = (selectedLevel) => {
    if (name && selectedLevel) {
      onStartGame(name, selectedLevel);
    } else {
      alert("Preencha todos os campos e selecione um nível!");
    }
  };

  return (
    <div className="start-screen">
      <h1>Bem-vindo ao Jogo da Tabuada da Soso!</h1>
      <input
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="level-buttons">
        <button onClick={() => handleStart("Fácil")}>Fácil</button>
        <button onClick={() => handleStart("Médio")}>Médio</button>
        <button onClick={() => handleStart("Gênio")}>Gênio</button>
      </div>

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

export default StartScreen;
