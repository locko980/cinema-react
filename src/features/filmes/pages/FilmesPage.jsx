import React, { useState, useEffect } from 'react'
import FilmeForm from '../components/FilmeForm'
import FilmesTable from '../components/FilmesTable'
import Navbar from '../../../components/Navbar'
import { filmesService } from '../../../services/filmesService'

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([])
  const [editingFilme, setEditingFilme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFilmes()
  }, [])

  const loadFilmes = async () => {
    try {
      setLoading(true)
      const data = await filmesService.getAll()
      setFilmes(data)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar filmes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveFilme = async (filme) => {
    try {
      setLoading(true)
      if (editingFilme) {
        await filmesService.update(filme.id, filme)
      } else {
        await filmesService.create(filme)
      }
      await loadFilmes()
      setEditingFilme(null)
      setError(null)
    } catch (err) {
      setError('Erro ao salvar filme')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditFilme = (filme) => {
    setEditingFilme(filme)
  }

  const handleDeleteFilme = async (id) => {
    try {
      setLoading(true)
      await filmesService.delete(id)
      await loadFilmes()
      if (editingFilme && editingFilme.id === id) {
        setEditingFilme(null)
      }
      setError(null)
    } catch (err) {
      setError('Erro ao deletar filme')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <h2 className="mt-4 mb-3">Cadastro de Filmes</h2>
          <div className="alert alert-info">
            <div className="d-flex align-items-center">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <span>Carregando...</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-3">Cadastro de Filmes</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <FilmeForm onSave={handleSaveFilme} initialData={editingFilme} />
        <FilmesTable
          filmes={filmes}
          onEdit={handleEditFilme}
          onDelete={handleDeleteFilme}
        />
      </div>
    </>
  )
}
