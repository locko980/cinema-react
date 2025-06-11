import React, { useState, useEffect } from 'react'

const initialForm = {
  filme: '',
  sala: '',
  data: '',
  horario: '',
  preco: ''
}

export default function SessaoForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)
  const [filmes, setFilmes] = useState([])
  const [salas, setSalas] = useState([])

  useEffect(() => {
    setFilmes(JSON.parse(localStorage.getItem('filmes')) || [])
    setSalas(JSON.parse(localStorage.getItem('salas')) || [])
  }, [])

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
            <label className="form-label">Filme</label>
            <select className="form-select" name="filme" value={form.filme} onChange={handleChange} required>
              <option value="">Selecione</option>
              {filmes.map((f, idx) => (
                <option key={idx} value={f.titulo}>{f.titulo}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sala</label>
            <select className="form-select" name="sala" value={form.sala} onChange={handleChange} required>
              <option value="">Selecione</option>
              {salas.map((s, idx) => (
                <option key={idx} value={s.nome}>{s.nome}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <input className="form-control" type="date" name="data" value={form.data} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Horário</label>
            <input className="form-control" type="time" name="horario" value={form.horario} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Preço</label>
            <input className="form-control" type="number" min="0" step="0.01" name="preco" value={form.preco} onChange={handleChange} required />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Salvar
      </button>
    </form>
  )
}
