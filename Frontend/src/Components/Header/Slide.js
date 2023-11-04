import React from "react";
import "./Slide.css";
import img from "../Ass/10.png";
import { HashLink as Hlink } from "react-router-hash-link";
function Slide() {
  return (
    <div>
      <div className="slider">
        <div className="left-slider">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            hic?
          </h1>
          <Hlink to="#product-sections" smooth>
            <button id="btn">Shop</button>
          </Hlink>
        </div>
        <div className="right-slider">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Slide;
