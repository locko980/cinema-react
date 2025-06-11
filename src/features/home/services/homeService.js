// src/features/home/services/homeService.js
export function fetchFilmes() {
  return JSON.parse(localStorage.getItem("filmes")) || [];
}

export function fetchSessoes() {
  return JSON.parse(localStorage.getItem("sessoes")) || [];
}
