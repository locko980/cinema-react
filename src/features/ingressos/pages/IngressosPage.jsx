import React, { useState, useEffect } from 'react'
import IngressoForm from '../components/IngressoForm'
import IngressosTable from '../components/IngressosTable'
import Navbar from '../../../components/Navbar'


export default function IngressosPage() {
  const [ingressos, setIngressos] = useState(() =>
    JSON.parse(localStorage.getItem('ingressos')) || []
  )
  const [editIndex, setEditIndex] = useState(null)
  const [editingIngresso, setEditingIngresso] = useState(null)

  useEffect(() => {
    localStorage.setItem('ingressos', JSON.stringify(ingressos))
  }, [ingressos])

  const handleSaveIngresso = (ingresso) => {
    if (editIndex !== null) {
      const novosIngressos = [...ingressos]
      novosIngressos[editIndex] = ingresso
      setIngressos(novosIngressos)
      setEditIndex(null)
      setEditingIngresso(null)
    } else {
      setIngressos([...ingressos, ingresso])
    }
  }

  const handleEditIngresso = (index) => {
    setEditIndex(index)
    setEditingIngresso(ingressos[index])
  }

  const handleDeleteIngresso = (index) => {
    setIngressos(ingressos.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setEditingIngresso(null)
    }
  }

  return (
  <>
    <Navbar />
    <div className="container">
      <h2 className="mt-4 mb-3">Venda de Ingressos</h2>
      <IngressoForm onSave={handleSaveIngresso} initialData={editingIngresso} />
      <IngressosTable
        ingressos={ingressos}
        onEdit={handleEditIngresso}
        onDelete={handleDeleteIngresso}
      />
    </div>
  </>
    )
}