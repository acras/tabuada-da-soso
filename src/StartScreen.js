import React, { useState, useEffect } from "react";

function StartScreen({ onStartGame }) {
  const [name, setName] = useState("");

  // Função para ler o cookie do nome do jogador
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Função para definir o cookie do nome do jogador
  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  useEffect(() => {
    // Quando a tela inicial é carregada, tenta ler o nome do jogador do cookie
    const savedName = getCookie("playerName");
    if (savedName) {
      setName(savedName); // Sugere o nome salvo no cookie
    }
  }, []);

  const handleStart = () => {
    if (name) {
      setCookie("playerName", name, 30); // Salva o nome do jogador no cookie por 30 dias
      onStartGame(name); // Inicia o jogo
    } else {
      alert("Por favor, insira seu nome para começar!");
    }
  };

  return (
    <div className="start-screen">
      <h1>Bem-vindo ao Jogo da Tabuada da Soso!</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Começar Jogo</button>
    </div>
  );
}

export default StartScreen;
