import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, text, to, btnText, secondary }) => (
  <div className="col-md-4">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <Link to={to} className="btn btn-primary">{btnText}</Link>
        {secondary && (
          <Link to={secondary.to} className="btn btn-secondary ms-2">
            {secondary.text}
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default FeatureCard;
