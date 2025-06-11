import React from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import HomeFeatures from '../components/HomeFeatures'
import HomeMoviesSection from '../components/HomeMoviesSection'
import HomeSessionsSection from '../components/HomeSessionsSection'
import Navbar from '../../../components/Navbar'

export default function HomePage() {
  const [filmes] = useLocalStorage('filmes', [])
  const [sessoes] = useLocalStorage('sessoes', [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className="mb-4">Bem-vindo ao Controle de Cinema!</h1>
        <p className="lead">
          Este sistema permite que você gerencie todas as operações do cinema…
        </p>

        <HomeFeatures />
        <HomeMoviesSection filmes={filmes} />
        <HomeSessionsSection sessoes={sessoes} />
      </div>
    </>
  )
}