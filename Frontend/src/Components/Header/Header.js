import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";
import logo from "../../Ass/Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HashLink as Hlink } from "react-router-hash-link";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function Header() {
  const { data } = useSelector((state) => state.cart);
  const { isAuthUser } = useSelector((state) => state.authuser);
  const { isAuthAdmin } = useSelector((state) => state.authAdmin);
  const Navigate = useNavigate();
  const [count, setcount] = useState(0);
  const Dispatch = useDispatch();

  useEffect(() => {
    setcount(data.length);
  });
  return (
    <div>
      <header id="h-1">
        <nav>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav">
            <ul>
              <Link to="/">
                <li>HOME</li>
              </Link>
              <Hlink to="#product-sections" smooth>
                <li>PRODUCT</li>
              </Hlink>
              <Hlink to="#categories-sections" smooth>
                <li>CATEGORIES</li>
              </Hlink>
              {/* <Hlink to="#store-sections" smooth>
                  <li>STORE</li>
                </Hlink> */}
              <Link to="/contact">
                <li>CONTACT</li>
              </Link>
            </ul>
          </div>
          <div className="icon">
            <IconButton
              aria-label="Search"
              onClick={() => {
                Navigate("/search");
              }}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
            {isAuthUser && (
              <IconButton
                onClick={() => {
                  Navigate("/cart");
                }}
                aria-label="cart"
                size="large"
              >
                <StyledBadge badgeContent={count} color="error">
                  <ShoppingCartIcon fontSize="large" />
                </StyledBadge>
              </IconButton>
            )}
            {isAuthAdmin && (
              <IconButton
                aria-label="Admin"
                onClick={() => {
                  Navigate("/admin");
                }}
              >
                <DashboardIcon fontSize="large" />
              </IconButton>
            )}
            {isAuthUser ? (
              <IconButton
                onClick={() => {
                  Navigate("/profile");
                }}
                aria-label="profile"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            ) : (
              <div className="log-btn">
                <Link to={"/login"}>
                  <button>Sign In</button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
