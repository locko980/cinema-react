import React from 'react'

export default function UsuariosTable({ usuarios, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Data de Cadastro</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center">Nenhum usuário cadastrado.</td>
          </tr>
        ) : (
          usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome || '-'}</td>
              <td>{usuario.email}</td>
              <td>{new Date(usuario.criadoEm).toLocaleDateString()}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => onEdit(usuario.id)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => onDelete(usuario.id)}
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