import React, { useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Reducers/CartReducer";
import { useParams } from "react-router-dom";
import img from "../Ass/maggi.png";
import Header from "../Header/Header";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductDetais({ match }) {
  const Dispatch = useDispatch();
  const { isAuthUser } = useSelector((state) => state.authuser);
  const { isAuthAdmin } = useSelector((state) => state.authAdmin);
  const [quantity, setquantity] = useState(1);
  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(false);
  const fetchProductDetais = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      setproduct(data.product);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProductDetais();
  }, []);

  // const { data } = useSelector((state) => state.cart);
  const addToCartHandler = () => {
    if (isAuthUser || isAuthAdmin) {
      const cartData = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      };
      Dispatch(setCart(cartData));
    } else {
      toast.error("Please Login", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setquantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity < 10) {
      setquantity(quantity + 1);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="ProductDetails">
            <div>
              <img className="CarouselImage" src={product.image} alt="" />
            </div>

            <div className="detailsblock">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-2-span"> {product.weight}g</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    {quantity}
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default ProductDetais;
