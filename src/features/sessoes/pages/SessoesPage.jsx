import React, { useState, useEffect } from 'react'
import SessaoForm from '../components/SessaoForm'
import SessoesTable from '../components/SessoesTable'
import Navbar from '../../../components/Navbar'
import { sessoesService } from '../../../services/sessoesService'

export default function SessoesPage() {
  const [sessoes, setSessoes] = useState([])
  const [editingSessao, setEditingSessao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSessoes()
  }, [])

  const loadSessoes = async () => {
    try {
      setLoading(true)
      const data = await sessoesService.getAll()
      setSessoes(data)
      setError(null)
    } catch (error) {
      setError('Erro ao carregar sessões')
      console.error('Erro ao carregar sessões:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSessao = async (sessao) => {
    try {
      if (editingSessao) {
        await sessoesService.update(editingSessao.id, sessao)
      } else {
        await sessoesService.create(sessao)
      }
      setEditingSessao(null)
      loadSessoes() // Recarrega a lista para mostrar a alteração
    } catch (error) {
      setError('Erro ao salvar sessão')
      console.error('Erro ao salvar sessão:', error)
    }
  }

  const handleEditSessao = (id) => {
    const sessaoToEdit = sessoes.find(s => s.id === id)
    if (sessaoToEdit) {
      setEditingSessao(sessaoToEdit)
    }
  }

  const handleDeleteSessao = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      return
    }
    try {
      await sessoesService.delete(id)
      loadSessoes() // Recarrega a lista
      if (editingSessao?.id === id) {
        setEditingSessao(null)
      }
    } catch (error) {
      setError('Erro ao deletar sessão')
      console.error('Erro ao deletar sessão:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <h2 className="mt-4 mb-3">Cadastro de Sessões</h2>
          <div className="alert alert-info">Carregando...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-3">
          {editingSessao ? 'Editar Sessão' : 'Cadastro de Sessões'}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <SessaoForm onSave={handleSaveSessao} initialData={editingSessao} />
        <SessoesTable
          sessoes={sessoes}
          onEdit={handleEditSessao}
          onDelete={handleDeleteSessao}
        />
      </div>
    </>
  )
}
