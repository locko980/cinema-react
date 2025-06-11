import React from 'react'
import SessionItem from '../../../components/SessionItem'

export default function HomeSessionsSection({ sessoes }) {
  return (
    <>
      <h2 className="mt-5">Sessões Disponíveis</h2>
      <div id="listaSessoes" className="list-group">
        {sessoes.length === 0 ? (
          <p className="text-center">Nenhuma sessão disponível.</p>
        ) : (
          sessoes.map((sessao, idx) => (
            <SessionItem key={idx} sessao={sessao} />
          ))
        )}
      </div>
    </>
  )
}
