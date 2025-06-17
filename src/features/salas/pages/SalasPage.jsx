import React, { useState, useEffect } from 'react'
import SalaForm from '../components/SalaForm'
import SalasTable from '../components/SalasTable'
import Navbar from '../../../components/Navbar'
import { salasService } from '../../../services/salasService'

export default function SalasPage() {
  const [salas, setSalas] = useState([])
  const [editingSala, setEditingSala] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSalas()
  }, [])

  const loadSalas = async () => {
    try {
      setLoading(true)
      const data = await salasService.getAll()
      setSalas(data)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar salas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSala = async (sala) => {
    try {
      if (!sala) {
        setEditingSala(null)
        return
      }

      if (editingSala) {
        console.log('Atualizando sala existente:', sala)
        const updatedSala = await salasService.update(editingSala.id, sala)
        setSalas(salas.map(s => s.id === editingSala.id ? updatedSala : s))
      } else {
        console.log('Criando nova sala:', sala)
        const newSala = await salasService.create(sala)
        setSalas([...salas, newSala])
      }
      setEditingSala(null)
      setError(null)
    } catch (err) {
      setError('Erro ao salvar sala')
      console.error(err)
    }
  }

  const handleEditSala = async (id) => {
    try {
      console.log('Iniciando edição da sala:', id)
      const sala = await salasService.getById(id)
      console.log('Sala carregada para edição:', sala)
      setEditingSala(sala)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar sala para edição')
      console.error(err)
    }
  }

  const handleDeleteSala = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta sala?')) {
      return
    }

    try {
      await salasService.delete(id)
      setSalas(salas.filter(sala => sala.id !== id))
      if (editingSala?.id === id) {
        setEditingSala(null)
      }
      setError(null)
    } catch (err) {
      setError('Erro ao deletar sala')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <h2 className="mt-4 mb-3">Cadastro de Salas</h2>
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
          {editingSala ? 'Editar Sala' : 'Cadastro de Salas'}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <SalaForm onSave={handleSaveSala} initialData={editingSala} />
        <SalasTable
          salas={salas}
          onEdit={handleEditSala}
          onDelete={handleDeleteSala}
        />
      </div>
    </>
  )
}