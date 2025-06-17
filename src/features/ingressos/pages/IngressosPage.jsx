import React, { useState, useEffect } from 'react'
import IngressoForm from '../components/IngressoForm'
import IngressosTable from '../components/IngressosTable'
import Navbar from '../../../components/Navbar'
import { ingressosService } from '../../../services/ingressosService'

export default function IngressosPage() {
  const [ingressos, setIngressos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editingIngresso, setEditingIngresso] = useState(null)

  useEffect(() => {
    loadIngressos()
  }, [])

  const loadIngressos = async () => {
    try {
      const data = await ingressosService.getAll()
      setIngressos(data)
    } catch (error) {
      console.error('Erro ao carregar ingressos:', error)
    }
  }

  const handleSaveIngresso = async (ingresso) => {
    try {
      await ingressosService.create(ingresso)
      loadIngressos()
    } catch (error) {
      console.error('Erro ao salvar ingresso:', error)
    }
  }

  const handleDeleteIngresso = async (id) => {
    try {
      await ingressosService.delete(id)
      loadIngressos()
    } catch (error) {
      console.error('Erro ao deletar ingresso:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-3">Venda de Ingressos</h2>
        <IngressoForm onSave={handleSaveIngresso} />
        <IngressosTable
          ingressos={ingressos}
          onDelete={handleDeleteIngresso}
        />
      </div>
    </>
  )
}