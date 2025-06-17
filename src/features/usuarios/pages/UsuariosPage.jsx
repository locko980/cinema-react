import React, { useState, useEffect } from 'react'
import UsuarioForm from '../components/UsuarioForm'
import UsuariosTable from '../components/UsuariosTable'
import Navbar from '../../../components/Navbar'
import { usuariosService } from '../../../services/usuariosService'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [editingUsuario, setEditingUsuario] = useState(null)

  useEffect(() => {
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      const data = await usuariosService.getAll()
      setUsuarios(data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    }
  }

  const handleSaveUsuario = async (usuario) => {
    try {
      if (editingUsuario) {
        await usuariosService.update(editingUsuario.id, usuario)
        setEditingUsuario(null)
      } else {
        await usuariosService.create(usuario)
      }
      loadUsuarios()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      alert('Erro ao salvar usuário. Verifique se o email já está em uso.')
    }
  }

  const handleEditUsuario = async (id) => {
    try {
      const usuario = await usuariosService.getById(id)
      setEditingUsuario(usuario)
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
    }
  }

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return
    }
    try {
      await usuariosService.delete(id)
      loadUsuarios()
      if (editingUsuario?.id === id) {
        setEditingUsuario(null)
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-3">Cadastro de Usuários</h2>
        <UsuarioForm onSave={handleSaveUsuario} initialData={editingUsuario} />
        <UsuariosTable
          usuarios={usuarios}
          onEdit={handleEditUsuario}
          onDelete={handleDeleteUsuario}
        />
      </div>
    </>
  )
} 