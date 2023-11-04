import React from "react";
import "./CatCard.css";
import { Link } from "react-router-dom";
function CatCard({ cat }) {
  return (
    <div>
      <Link className="catLink" to={`/category/${cat.name}`}>
        <div className="card">
          <div className="img">
            <img src={cat.img} alt="" />
          </div>
          <div className="cat">
            <h4>{cat.name}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CatCard;
