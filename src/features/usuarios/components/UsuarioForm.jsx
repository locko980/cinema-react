import React, { useState, useEffect } from 'react'

const initialForm = {
  nome: '',
  email: '',
  password: ''
}

export default function UsuarioForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (initialData) {
      // Não incluir a senha ao editar
      const { password, ...userData } = initialData
      setForm(userData)
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
    onSave(form)
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!initialData}
              placeholder={initialData ? '(Manter senha atual)' : ''}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Atualizar' : 'Cadastrar'}
      </button>
    </form>
  )
} 