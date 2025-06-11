import React from 'react'

export default function SalasTable({ salas, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Capacidade</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {salas.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center">Nenhuma sala cadastrada.</td>
          </tr>
        ) : (
          salas.map((sala, idx) => (
            <tr key={idx}>
              <td>{sala.nome}</td>
              <td>{sala.capacidade}</td>
              <td>{sala.tipo}</td>
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
