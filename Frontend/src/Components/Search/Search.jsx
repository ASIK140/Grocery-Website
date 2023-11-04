import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../Home/ProductCart";
import { searchProduct } from "../../Reducers/ProductReducer";
import Loader from "../Loader/Loader";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
function Search() {
  const [keyword, setkeyword] = React.useState("");
  const { product } = useSelector((state) => state.product.data);
  const { loading } = useSelector((state) => state.product);
  const Dispatch = useDispatch();
  const SearchProduct = (e) => {
    e.preventDefault();
    Dispatch(searchProduct(keyword));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="search">
            <form onSubmit={SearchProduct}>
              <input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => {
                  setkeyword(e.target.value);
                }}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
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
          <Footer />
        </div>
      )}
    </>
  );
}

export default Search;
