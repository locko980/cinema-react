import React, { useState, useEffect } from 'react'
import SessaoForm from '../components/SessaoForm'
import SessoesTable from '../components/SessoesTable'
import Navbar from '../../../components/Navbar'

export default function SessoesPage() {
  const [sessoes, setSessoes] = useState(() =>
    JSON.parse(localStorage.getItem('sessoes')) || []
  )
  const [editIndex, setEditIndex] = useState(null)
  const [editingSessao, setEditingSessao] = useState(null)

  useEffect(() => {
    localStorage.setItem('sessoes', JSON.stringify(sessoes))
  }, [sessoes])

  const handleSaveSessao = (sessao) => {
    if (editIndex !== null) {
      const novasSessoes = [...sessoes]
      novasSessoes[editIndex] = sessao
      setSessoes(novasSessoes)
      setEditIndex(null)
      setEditingSessao(null)
    } else {
      setSessoes([...sessoes, sessao])
    }
  }

  const handleEditSessao = (index) => {
    setEditIndex(index)
    setEditingSessao(sessoes[index])
  }

  const handleDeleteSessao = (index) => {
    setSessoes(sessoes.filter((_, i) => i !== index))
    if (editIndex === index) {
      setEditIndex(null)
      setEditingSessao(null)
    }
  }

  return (
  <>
    <Navbar />
    <div className="container">
      <h2 className="mt-4 mb-3">Cadastro de Sessões</h2>
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
