import React, { useState, useEffect } from 'react'
import { sessoesService } from '../../../services/sessoesService'
import { usuariosService } from '../../../services/usuariosService'

const initialForm = {
  sessaoId: '',
  usuarioId: '',
}

export default function IngressoForm({ onSave }) {
  const [form, setForm] = useState(initialForm)
  const [sessoes, setSessoes] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    loadSessoes()
    loadUsuarios()
  }, [])

  const loadSessoes = async () => {
    try {
      const data = await sessoesService.getAll()
      setSessoes(data)
    } catch (error) {
      console.error('Erro ao carregar sessões:', error)
    }
  }

  const loadUsuarios = async () => {
    try {
      const data = await usuariosService.getAll()
      setUsuarios(data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.sessaoId || !form.usuarioId) {
      alert('Por favor, preencha todos os campos')
      return
    }
    onSave({
      sessaoId: Number(form.sessaoId),
      usuarioId: Number(form.usuarioId)
    })
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <select
              className="form-select"
              name="usuarioId"
              value={form.usuarioId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome || usuario.email}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sessão</label>
            <select
              className="form-select"
              name="sessaoId"
              value={form.sessaoId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {sessoes.map((sessao) => (
                <option key={sessao.id} value={sessao.id}>
                  {sessao.filme?.titulo} - {new Date(sessao.data).toLocaleDateString()} {sessao.horario} - Sala {sessao.sala?.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Comprar Ingresso
      </button>
    </form>
  )
}
