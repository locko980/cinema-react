// src/features/home/components/HomeFeatures.jsx
import React from 'react'
import FeatureCard from '../../../components/FeatureCard'

export default function HomeFeatures() {
  return (
    <div className="row mt-4">
      <FeatureCard
        title="Cadastro de Filmes"
        text="Cadastre novos filmes…"
        to="/filmes"
        btnText="Acessar"
      />
      <FeatureCard
        title="Cadastro de Salas"
        text="Gerencie as salas…"
        to="/salas"
        btnText="Acessar"
      />
      <FeatureCard
        title="Sessões e Ingressos"
        text="Configure as sessões…"
        to="/sessoes"
        btnText="Sessões"
        secondary={{ to: '/ingressos', text: 'Ingressos' }}
      />
    </div>
  )
}
