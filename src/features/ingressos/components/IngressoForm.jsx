import React, { useState, useEffect } from 'react'

const initialForm = {
  sessao: '',
  quantidade: 1,
  comprador: '', // opcional: nome do cliente
}

export default function IngressoForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)
  const [sessoes, setSessoes] = useState([])

  useEffect(() => {
    setSessoes(JSON.parse(localStorage.getItem('sessoes')) || [])
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
            <label className="form-label">Sessão</label>
            <select
              className="form-select"
              name="sessao"
              value={form.sessao}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {sessoes.map((s, idx) => (
                <option key={idx} value={`${s.filme} - ${s.data} ${s.horario}`}>
                  {s.filme} ({s.data} {s.horario}) - Sala {s.sala}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantidade</label>
            <input
              className="form-control"
              type="number"
              name="quantidade"
              min={1}
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nome do comprador (opcional)</label>
            <input
              className="form-control"
              name="comprador"
              value={form.comprador}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Salvar
      </button>
    </form>
  )
}
