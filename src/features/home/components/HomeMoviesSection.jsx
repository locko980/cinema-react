import React from 'react'
import MovieCard from '../../../components/MovieCard'

export default function HomeMoviesSection({ filmes }) {
  return (
    <>
      <h2 className="mt-5">Filmes Cadastrados</h2>
      <div id="listaFilmes" className="row gy-4">
        {filmes.length === 0 ? (
          <p className="text-center">Nenhum filme cadastrado.</p>
        ) : (
          filmes.map((filme, idx) => (
            <MovieCard key={idx} filme={filme} />
          ))
        )}
      </div>
    </>
  )
}
