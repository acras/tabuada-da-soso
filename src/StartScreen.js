import React, { useState, useEffect } from "react";
import "./StartScreen.css"; // Adicionaremos um CSS específico para estilizar

function StartScreen({ onStartGame }) {
  const [name, setName] = useState("");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  useEffect(() => {
    const savedName = getCookie("playerName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleStart = () => {
    if (name) {
      setCookie("playerName", name, 30);
      onStartGame(name);
    } else {
      alert("Por favor, insira seu nome para começar!");
    }
  };

  return (
    <div className="start-screen">
      <div className="content">
        <h1>Bem-vindo ao Jogo da Tabuada da Soso!</h1>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        &nbsp;
        <button onClick={handleStart}>Começar Jogo</button>
      </div>
    </div>
  );
}

export default StartScreen;
