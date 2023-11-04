import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, setAuth } from "../../../Reducers/UserReducer";
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.user);
  // const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();
  // const [avatar, setAvatar] = useState();
  // const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/v1/UpdateProfile", {
        name,
        email,
      });
      toast.success("Update Profile Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Navigate("/");
      dispatch(getUser(data.user));
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //     setEmail(user.email);
  //   }

  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     alert.success("Profile Updated Successfully");
  //     dispatch(loadUser());

  //     dispatch({
  //       type: UPDATE_PROFILE_RESET,
  //     });
  //   }
  // }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>

          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img
                src="https://as2.ftcdn.net/v2/jpg/00/97/58/97/1000_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                alt="Avatar Preview"
              />
              <input type="file" name="avatar" accept="image/*" />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
