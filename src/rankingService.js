// src/api.js
export const fetchRanking = async (level) => {
  try {
    const response = await fetch(`http://localhost:3001/api/ranking/${level}`);
    const ranking = await response.json();
    return ranking.slice(0, 10); // Pega apenas os top 10 jogadores
  } catch (error) {
    console.error(`Erro ao buscar ranking do nível ${level}:`, error);
    return [];
  }
};
