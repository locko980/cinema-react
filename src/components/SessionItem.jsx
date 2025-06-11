import React from "react";

const SessionItem = ({ sessao }) => (
  <a className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{sessao.filme}</h5>
      <small>{sessao.dataHora}</small>
    </div>
    <p className="mb-1">
      Sala: {sessao.sala} | Preço: {sessao.preco}
    </p>
    <small>
      Idioma: {sessao.idioma} | Formato: {sessao.formato}
    </small>
  </a>
);

export default SessionItem;
