import React from "react";

const SessionItem = ({ sessao }) => {
  const formatarData = (data) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          {sessao.filme?.imagem ? (
            <img 
              src={sessao.filme.imagem} 
              alt={sessao.filme?.titulo} 
              className="img-fluid rounded-start"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                minHeight: '150px'
              }}
            />
          ) : (
            <div 
              className="bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ height: '150px' }}
            >
              <i className="bi bi-film" style={{ fontSize: '2rem' }}></i>
            </div>
          )}
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{sessao.filme?.titulo || 'Filme não encontrado'}</h5>
            <p className="card-text">
              <small className="text-muted">
                {formatarData(sessao.data)} às {sessao.horario}
              </small>
            </p>
            <p className="card-text">
              <strong>Sala:</strong> {sessao.sala?.nome} ({sessao.sala?.tipo})
              <br />
              <strong>Capacidade:</strong> {sessao.sala?.capacidade} lugares
            </p>
            {sessao.filme?.genero && (
              <p className="card-text">
                <small className="text-muted">
                  <strong>Gênero:</strong> {sessao.filme.genero}
                  {sessao.filme.classificacao && ` | Classificação: ${sessao.filme.classificacao}`}
                  {sessao.filme.duracao && ` | Duração: ${sessao.filme.duracao} min`}
                </small>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionItem;
