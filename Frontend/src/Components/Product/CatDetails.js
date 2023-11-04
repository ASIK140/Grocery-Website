import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CatProduct } from "../../Reducers/ProductReducer";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import ProductCard from "../Home/ProductCart";
function CatDetails({ match }) {
  const { keyword } = useParams();
  const { product } = useSelector((state) => state.product.data);
  const { loading } = useSelector((state) => state.product);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(CatProduct(keyword));
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="Search-Product">
          <div className="container">
            {product &&
              product.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CatDetails;
