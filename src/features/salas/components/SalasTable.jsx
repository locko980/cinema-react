import React from 'react'

export default function SalasTable({ salas, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
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
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.nome}</td>
              <td>{sala.capacidade}</td>
              <td>{sala.tipo}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(sala.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(sala.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  )
}
