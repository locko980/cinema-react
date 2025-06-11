import React from 'react'

export default function IngressosTable({ ingressos, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Sessão</th>
          <th>Quantidade</th>
          <th>Comprador</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {ingressos.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center">Nenhum ingresso vendido.</td>
          </tr>
        ) : (
          ingressos.map((ingresso, idx) => (
            <tr key={idx}>
              <td>{ingresso.sessao}</td>
              <td>{ingresso.quantidade}</td>
              <td>{ingresso.comprador || '-'}</td>
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
