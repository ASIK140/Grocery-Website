import React, { useState } from "react";
import Header from "../Header/Header";
import "./Home.css";
import ProductCard from "./ProductCart";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { HashLink as Hlink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { AuthAdmin } from "../../Reducers/AuthAdmin";
import { AuthUser } from "../../Reducers/AuthUser";
import Slide from "../Header/Slide";
import Footer from "../Footer/Footer";
import { fetchProduct } from "../../Reducers/ProductReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "../Product/Categories";
function Home() {
  const Dispatch = useDispatch();
  const { product, productsCount } = useSelector((state) => state.product.data);
  const { loading } = useSelector((state) => state.product);

  const resultPerPage = 8;
  let pages = productsCount / resultPerPage;
  pages = Math.ceil(pages);
  const [page, setpage] = useState(1);
  const pevPage = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < pages) {
      setpage(page + 1);
    }
  };
  useEffect(() => {
    Dispatch(fetchProduct());
    Dispatch(AuthAdmin());
    Dispatch(AuthUser());
  }, [Dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <Header />
          <Slide />
          <div className="heading" id="product-sections">
            <h3>Products</h3>
          </div>
          <div className="container">
            {product &&
              product
                .slice(resultPerPage * (page - 1), page * resultPerPage)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
          <div className="pagination">
            <Hlink to="#product-sections" smooth>
              <button onClick={pevPage}>Pev</button>
            </Hlink>
            {page} of {pages}
            <Hlink to="#product-sections" smooth>
              <button onClick={nextPage}>Next</button>
            </Hlink>
          </div>
          <div className="heading" id="categories-sections">
            <h4>Categories</h4>
          </div>
          <div className="container">
            <Categories />
          </div>
          <Footer />
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

export default Home;
