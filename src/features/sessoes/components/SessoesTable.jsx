import React from 'react'

export default function SessoesTable({ sessoes, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Filme</th>
          <th>Sala</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sessoes.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">Nenhuma sessão cadastrada.</td>
          </tr>
        ) : (
          sessoes.map((sessao) => (
            <tr key={sessao.id}>
              <td>{sessao.filme?.titulo}</td>
              <td>{sessao.sala?.nome} - {sessao.sala?.tipo}</td>
              <td>{new Date(sessao.data).toLocaleDateString()}</td>
              <td>{sessao.horario}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => onEdit(sessao.id)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => onDelete(sessao.id)}
                >
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
