import React, { useState, useEffect } from 'react'

const initialForm = {
  nome: '',
  capacidade: '',
  tipo: '', // ex: 2D, 3D, IMAX...
}

export default function SalaForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    console.log('initialData recebido:', initialData)
    if (initialData) {
      setForm({
        id: initialData.id,
        nome: initialData.nome,
        capacidade: initialData.capacidade,
        tipo: initialData.tipo,
      })
    } else {
      setForm(initialForm)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newValue = name === 'capacidade' ? parseInt(value) || '' : value
    console.log('Campo alterado:', { name, value, newValue })
    setForm(prev => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Enviando formulário:', form)
    const formData = {
      ...form,
      capacidade: parseInt(form.capacidade)
    }
    onSave(formData)
    if (!initialData) {
      setForm(initialForm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nome da Sala</label>
            <input
              className="form-control"
              name="nome"
              value={form.nome || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Capacidade</label>
            <input
              className="form-control"
              name="capacidade"
              type="number"
              min="1"
              value={form.capacidade || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              name="tipo"
              value={form.tipo || ''}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        {initialData ? 'Atualizar' : 'Salvar'}
      </button>
      {initialData && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => {
            setForm(initialForm)
            onSave(null)
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  )
}