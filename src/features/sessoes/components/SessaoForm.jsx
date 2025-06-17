import React, { useState, useEffect } from 'react'
import { filmesService } from '../../../services/filmesService'
import { salasService } from '../../../services/salasService'

const initialForm = {
  filmeId: '',
  salaId: '',
  data: '',
  horario: '',
}

// Função para formatar a data para o input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  // Tenta criar um objeto de data. Se for inválido, retorna a string original.
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return dateString // ou return '' se preferir
  }
  // Pega o ano, mês e dia do fuso horário local para evitar problemas de um dia a menos.
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function SessaoForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)
  const [filmes, setFilmes] = useState([])
  const [salas, setSalas] = useState([])

  useEffect(() => {
    loadFilmes()
    loadSalas()
  }, [])

  const loadFilmes = async () => {
    try {
      const data = await filmesService.getAll()
      setFilmes(data)
    } catch (error) {
      console.error('Erro ao carregar filmes:', error)
    }
  }

  const loadSalas = async () => {
    try {
      const data = await salasService.getAll()
      setSalas(data)
    } catch (error) {
      console.error('Erro ao carregar salas:', error)
    }
  }

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        // Extrai 'YYYY-MM-DD' da string ISO da API. Ex: '2025-06-17T03:00:00.000Z' -> '2025-06-17'
        // Isso evita qualquer bug de fuso horário ao preencher o formulário.
        data: initialData.data ? initialData.data.split('T')[0] : '',
      })
    } else {
      setForm(initialForm)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Garante que a data seja enviada no formato correto para a API
    const formData = {
      ...form,
      filmeId: Number(form.filmeId),
      salaId: Number(form.salaId),
      data: new Date(`${form.data}T00:00:00`), // Adiciona um T00:00:00 para conformidade
    }
    onSave(formData)
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Filme</label>
            <select
              className="form-select"
              name="filmeId"
              value={form.filmeId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {filmes.map((filme) => (
                <option key={filme.id} value={filme.id}>
                  {filme.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sala</label>
            <select
              className="form-select"
              name="salaId"
              value={form.salaId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome} - {sala.tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <input
              className="form-control"
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Horário</label>
            <input
              className="form-control"
              type="time"
              name="horario"
              value={form.horario}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        {initialData ? 'Atualizar' : 'Salvar'}
      </button>
    </form>
  )
}
