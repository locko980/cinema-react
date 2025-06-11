import React, { useState, useEffect } from 'react'

const initialForm = {
  nome: '',
  capacidade: '',
  tipo: '', // ex: 2D, 3D, IMAX...
}

export default function SalaForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (initialData) setForm(initialData)
    else setForm(initialForm)
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nome da Sala</label>
            <input className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Capacidade</label>
            <input className="form-control" name="capacidade" value={form.capacidade} onChange={handleChange} type="number" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select className="form-select" name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Salvar
      </button>
    </form>
  )
}