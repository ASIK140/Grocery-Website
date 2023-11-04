import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import img from "../Ass/maggi.png";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="img">
        <img src={product.image} alt={product.name} />
      </div>
      <p>{product.name}</p>
      <div>
        <span className="productCardSpan">{product.weight}g</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
