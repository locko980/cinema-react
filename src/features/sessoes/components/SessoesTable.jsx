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
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sessoes.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">Nenhuma sessão cadastrada.</td>
          </tr>
        ) : (
          sessoes.map((sessao, idx) => (
            <tr key={idx}>
              <td>{sessao.filme}</td>
              <td>{sessao.sala}</td>
              <td>{sessao.data}</td>
              <td>{sessao.horario}</td>
              <td>R$ {Number(sessao.preco).toFixed(2)}</td>
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
