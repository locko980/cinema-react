import React, { useState, useEffect } from 'react'
import FilmeForm from '../components/FilmeForm'
import FilmesTable from '../components/FilmesTable'
import Navbar from '../../../components/Navbar'

export default function FilmesPage() {
  const [filmes, setFilmes] = useState(() =>
    JSON.parse(localStorage.getItem('filmes')) || []
  )
  const [editIndex, setEditIndex] = useState(null)
  const [editingFilme, setEditingFilme] = useState(null)

  useEffect(() => {
    localStorage.setItem('filmes', JSON.stringify(filmes))
  }, [filmes])

  const handleSaveFilme = (filme) => {
    if (editIndex !== null) {
      const novosFilmes = [...filmes]
      novosFilmes[editIndex] = filme
      setFilmes(novosFilmes)
      setEditIndex(null)
      setEditingFilme(null)
    } else {
      setFilmes([...filmes, filme])
    }
  }

  const handleEditFilme = (index) => {
    setEditIndex(index)
    setEditingFilme(filmes[index])
  }

  const handleDeleteFilme = (index) => {
    setFilmes(filmes.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setEditingFilme(null)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-3">Cadastro de Filmes</h2>
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
