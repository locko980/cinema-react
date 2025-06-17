import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, text, to, btnText, secondary }) => (
  <div className="card h-100">
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{title}</h5>
      <p className="card-text flex-grow-1">{text}</p>
      <div className="mt-auto">
        <Link to={to} className="btn btn-primary me-2">{btnText}</Link>
        {secondary && (
          <Link to={secondary.to} className="btn btn-secondary">
            {secondary.text}
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default FeatureCard;
