import React, { useState, useEffect } from 'react'

const initialForm = {
  titulo: '',
  descricao: '',
  genero: '',
  classificacao: '',
  duracao: '',
  dataEstreia: '',
  imagem: ''
}

export default function FilmeForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
      setPreview(initialData.imagem || '')
    } else {
      setForm(initialForm)
      setPreview('')
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, imagem: reader.result })
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    setForm(initialForm)
    setPreview('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input className="form-control" name="titulo" value={form.titulo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea className="form-control" name="descricao" value={form.descricao} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Gênero</label>
            <input className="form-control" name="genero" value={form.genero} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Classificação</label>
            <input className="form-control" name="classificacao" value={form.classificacao} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Duração (min)</label>
            <input className="form-control" name="duracao" value={form.duracao} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Data de Estreia</label>
            <input type="date" className="form-control" name="dataEstreia" value={form.dataEstreia} onChange={handleChange} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Imagem</label>
            <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Prévia" style={{maxWidth: 300, marginTop: 10}} />}
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Salvar
      </button>
    </form>
  )
}
