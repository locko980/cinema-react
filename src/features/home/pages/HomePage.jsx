import React, { useState, useEffect } from 'react'
import HomeFeatures from '../components/HomeFeatures'
import HomeMoviesSection from '../components/HomeMoviesSection'
import HomeSessionsSection from '../components/HomeSessionsSection'
import Navbar from '../../../components/Navbar'
import { fetchFilmes } from '../services/homeService'

export default function HomePage() {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFilmes()
  }, [])

  const loadFilmes = async () => {
    try {
      setLoading(true)
      const filmesData = await fetchFilmes()
      setFilmes(filmesData)
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar filmes:', err)
      setError('Erro ao carregar filmes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container home-container">
        <h1 className="mb-4">Bem-vindo ao Controle de Cinema!</h1>
        <p className="lead mb-5">
          Este sistema permite que você gerencie todas as operações do cinema, incluindo filmes,
          salas, sessões, ingressos e usuários.
        </p>

        <HomeFeatures />
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
        <HomeMoviesSection filmes={filmes} />
        )}
        <HomeSessionsSection />
      </div>
    </>
  )
}