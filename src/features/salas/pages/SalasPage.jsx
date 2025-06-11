import React, { useState, useEffect } from 'react'
import SalaForm from '../components/SalaForm'
import SalasTable from '../components/SalasTable'
import Navbar from '../../../components/Navbar'

export default function SalasPage() {
  const [salas, setSalas] = useState(() =>
    JSON.parse(localStorage.getItem('salas')) || []
  )
  const [editIndex, setEditIndex] = useState(null)
  const [editingSala, setEditingSala] = useState(null)

  useEffect(() => {
    localStorage.setItem('salas', JSON.stringify(salas))
  }, [salas])

  const handleSaveSala = (sala) => {
    if (editIndex !== null) {
      const novasSalas = [...salas]
      novasSalas[editIndex] = sala
      setSalas(novasSalas)
      setEditIndex(null)
      setEditingSala(null)
    } else {
      setSalas([...salas, sala])
    }
  }

  const handleEditSala = (index) => {
    setEditIndex(index)
    setEditingSala(salas[index])
  }

  const handleDeleteSala = (index) => {
    setSalas(salas.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setEditingSala(null)
    }
  }

  return (
  <>
    <Navbar />
    <div className="container">
      <h2 className="mt-4 mb-3">Cadastro de Salas</h2>
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