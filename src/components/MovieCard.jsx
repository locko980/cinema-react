import React from "react";

const MovieCard = ({ filme }) => {
  const imgSrc = filme.imagem?.trim() 
    ? filme.imagem 
    : "/imagens/placeholder.png";

  return (
    <div className="col-md-4">
      <div className="card h-100">
        <img
          src={imgSrc}
          className="card-img-top"
          alt={filme.titulo}
          style={{ objectFit: "cover", height: 200 }}
        />
        <div className="card-body">
          <h5 className="card-title">{filme.titulo}</h5>
          <p className="card-text">{filme.descricao}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Estreia: {filme.dataEstreia}</small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
