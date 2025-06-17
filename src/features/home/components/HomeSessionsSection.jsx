import React, { useState, useEffect } from 'react'
import SessionItem from '../../../components/SessionItem'
import { fetchSessoes } from '../services/homeService'

export default function HomeSessionsSection() {
  const [sessoes, setSessoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSessoes()
  }, [])

  const loadSessoes = async () => {
    try {
      setLoading(true)
      const data = await fetchSessoes()
      setSessoes(data)
      setError(null)
    } catch (error) {
      console.error('Erro ao carregar sessões:', error)
      setError('Erro ao carregar sessões')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className="mt-5">Sessões Disponíveis</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div id="listaSessoes" className="list-group">
          {sessoes.length === 0 ? (
            <p className="text-center">Nenhuma sessão disponível.</p>
          ) : (
            sessoes.map((sessao) => (
              <SessionItem key={sessao.id} sessao={sessao} />
            ))
          )}
        </div>
      )}
    </>
  )
}
