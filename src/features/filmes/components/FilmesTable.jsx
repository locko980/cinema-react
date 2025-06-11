import React from 'react'

export default function FilmesTable({ filmes, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Gênero</th>
          <th>Classificação</th>
          <th>Duração</th>
          <th>Data de Estreia</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {filmes.length === 0 ? (
          <tr>
            <td colSpan={8} className="text-center">Nenhum filme cadastrado.</td>
          </tr>
        ) : (
          filmes.map((filme, idx) => (
            <tr key={idx}>
              <td>{filme.titulo}</td>
              <td>{filme.descricao}</td>
              <td>{filme.genero}</td>
              <td>{filme.classificacao}</td>
              <td>{filme.duracao}</td>
              <td>{filme.dataEstreia}</td>
              <td>
                {filme.imagem && (
                  <img src={filme.imagem} alt="Capa" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                )}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(idx)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(idx)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
