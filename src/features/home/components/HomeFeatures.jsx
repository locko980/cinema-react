// src/features/home/components/HomeFeatures.jsx
import React from 'react'
import FeatureCard from '../../../components/FeatureCard'

export default function HomeFeatures() {
  return (
    <div className="features-grid">
      <div className="features-row">
        <div className="feature-item">
          <FeatureCard
            title="Cadastro de Filmes"
            text="Cadastre e gerencie os filmes em cartaz"
            to="/filmes"
            btnText="Acessar"
          />
        </div>
        <div className="feature-item">
          <FeatureCard
            title="Cadastro de Salas"
            text="Gerencie as salas do cinema"
            to="/salas"
            btnText="Acessar"
          />
        </div>
      </div>
      <div className="features-row">
        <div className="feature-item">
          <FeatureCard
            title="Sessões e Ingressos"
            text="Configure as sessões e venda de ingressos"
            to="/sessoes"
            btnText="Sessões"
            secondary={{ to: '/ingressos', text: 'Ingressos' }}
          />
        </div>
        <div className="feature-item">
          <FeatureCard
            title="Usuários"
            text="Gerencie os usuários do sistema"
            to="/usuarios"
            btnText="Acessar"
          />
        </div>
      </div>
    </div>
  )
}
