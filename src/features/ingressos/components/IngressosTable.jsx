import React from 'react'

export default function IngressosTable({ ingressos, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Filme</th>
          <th>Sala</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Usuário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {ingressos.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">Nenhum ingresso vendido.</td>
          </tr>
        ) : (
          ingressos.map((ingresso) => (
            <tr key={ingresso.id}>
              <td>{ingresso.sessao?.filme?.titulo}</td>
              <td>{ingresso.sessao?.sala?.nome}</td>
              <td>{new Date(ingresso.sessao?.data).toLocaleDateString()}</td>
              <td>{ingresso.sessao?.horario}</td>
              <td>{ingresso.usuario?.nome || 'Usuário ' + ingresso.usuarioId}</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => onDelete(ingresso.id)}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
