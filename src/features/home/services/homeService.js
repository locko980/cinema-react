// src/features/home/services/homeService.js
import { filmesService } from '../../../services/filmesService';
import { sessoesService } from '../../../services/sessoesService';

export async function fetchFilmes() {
  try {
    const filmes = await filmesService.getAll();
    return filmes;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error; // Propaga o erro para o componente tratar
  }
}

export async function fetchSessoes() {
  try {
    const sessoes = await sessoesService.getAll();
    console.log('Sessões recebidas da API:', sessoes); // LOG 1: Ver o que a API retorna

    // Cria a string da data de hoje de forma segura, sem bugs de fuso horário
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const hojeString = `${ano}-${mes}-${dia}`; // Ex: "2025-06-17"

    const sessoesFuturas = sessoes.filter(sessao => {
      if (!sessao.data) {
        console.warn('Sessão sem data encontrada:', sessao);
        return false;
      }
      // Extrai a parte da data da string ISO da API (ex: "2025-06-17T03:00:00.000Z" -> "2025-06-17")
      const dataSessaoString = sessao.data.split('T')[0];
      
      // Compara as strings de data. Isso evita qualquer problema de fuso horário.
      return dataSessaoString >= hojeString;
    });
    
    console.log('Sessões após o filtro:', sessoesFuturas); // LOG 4: Ver o resultado do filtro

    // Ordena as sessões por data e depois por horário
    return sessoesFuturas.sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);

      if (dataA.getTime() !== dataB.getTime()) {
        return dataA - dataB;
      }
      
      // Se as datas forem iguais, ordena pelo horário
      return a.horario.localeCompare(b.horario);
    });

  } catch (error) {
    console.error('Erro ao buscar sessões:', error);
    throw error; // Propaga o erro para o componente tratar
  }
}
