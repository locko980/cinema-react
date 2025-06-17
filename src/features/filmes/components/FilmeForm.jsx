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

const MAX_IMAGE_SIZE = 800 // Tamanho máximo em pixels

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > height && width > MAX_IMAGE_SIZE) {
            height *= MAX_IMAGE_SIZE / width
            width = MAX_IMAGE_SIZE
          } else if (height > MAX_IMAGE_SIZE) {
            width *= MAX_IMAGE_SIZE / height
            height = MAX_IMAGE_SIZE
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          
          // Comprimir a imagem com qualidade 0.7
          const resizedImage = canvas.toDataURL('image/jpeg', 0.7)
          
          // Verificar o tamanho da string base64
          const base64Length = resizedImage.length
          if (base64Length > 5000000) { // 5MB
            reject(new Error('Imagem muito grande após compressão'))
            return
          }
          
          resolve(resizedImage)
        } catch (error) {
          reject(error)
        }
      }
      img.onerror = () => reject(new Error('Erro ao carregar imagem'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
    reader.readAsDataURL(file)
  })
}

export default function FilmeForm({ onSave, initialData }) {
  const [form, setForm] = useState(initialForm)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
      setPreview(initialData.imagem || '')
    } else {
      setForm(initialForm)
      setPreview('')
    }
    setError(null)
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10000000) { // 10MB
        setError('Arquivo muito grande. Por favor, selecione uma imagem menor que 10MB.')
        return
      }

      setLoading(true)
      setError(null)
      try {
        const resizedImage = await resizeImage(file)
        setForm({ ...form, imagem: resizedImage })
        setPreview(resizedImage)
      } catch (error) {
        console.error('Erro ao processar imagem:', error)
        setError('Erro ao processar imagem. Por favor, tente outra imagem.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    onSave(form)
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
            <input 
              className="form-control" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              disabled={loading} 
            />
            {loading && (
              <div className="text-info mt-2">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Processando...</span>
                </div>
                Processando imagem...
              </div>
            )}
            {error && <div className="text-danger mt-2">{error}</div>}
            {preview && (
              <div className="mt-3">
                <img 
                  src={preview} 
                  alt="Prévia" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    objectFit: 'contain'
                  }} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processando...
          </>
        ) : 'Salvar'}
      </button>
    </form>
  )
}
