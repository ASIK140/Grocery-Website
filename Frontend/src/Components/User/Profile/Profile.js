import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthAdmin } from "../../../Reducers/AuthAdmin";
import { getAuthUser } from "../../../Reducers/AuthUser";
import { userLogOut } from "../../../Reducers/UserReducer";
import { getUserDetais } from "../../../Reducers/UserReducer";
import Loader from "../../Loader/Loader";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import axios from "axios";
import img from "../../../Ass/man.png";
import "./Profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = ({ history }) => {
  // const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  let { loading } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const logout = async () => {
    loading = true;
    try {
      const { data } = await axios.get("/api/v1/logout");
      if (data.success) {
        Navigate("/");
        loading = false;
        localStorage.removeItem("cartItems");
        Dispatch(getAuthAdmin(false));
        Dispatch(getAuthUser(false));
        toast.success("Logout Successful", {
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
    } catch (error) {
      loading = false;

      console.log(error);
    }
  };
  useEffect(() => {
    Dispatch(getUserDetais());
  }, [Dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={img} alt="" />
              <Link to="/profile/update">Edit Profile</Link>
              <button className="log-out-btn" onClick={logout}>
                Log Out
              </button>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/profile/update/pass">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
