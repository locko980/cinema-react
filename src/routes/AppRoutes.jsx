import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../features/home/pages/HomePage'
import FilmesPage from '../features/filmes/pages/FilmesPage'
import SalasPage from '../features/salas/pages/SalasPage'
import SessoesPage from '../features/sessoes/pages/SessoesPage'
import IngressosPage from '../features/ingressos/pages/IngressosPage'
import UsuariosPage from '../features/usuarios/pages/UsuariosPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/filmes" element={<FilmesPage />} />
      <Route path="/salas" element={<SalasPage />} />
      <Route path="/sessoes" element={<SessoesPage />} />
      <Route path="/ingressos" element={<IngressosPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
