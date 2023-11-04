import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import { toast } from "react-toastify";
const UpdatePassword = ({ history }) => {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldpass, setoldpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/UpdatePassword", {
        oldpass,
        newpass,
        confirmpass,
      });
      toast.success("Password Update Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }

    // dispatch(updatePassword(myForm));
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     alert.success("Profile Updated Successfully");

  //     history.push("/account");

  //     dispatch({
  //       type: UPDATE_PASSWORD_RESET,
  //     });
  //   }
  // }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Profile</h2>

          <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldpass}
                onChange={(e) => setoldpass(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenOutlinedIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newpass}
                onChange={(e) => setnewpass(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOutlinedIcon />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmpass}
                onChange={(e) => setconfirmpass(e.target.value)}
              />
            </div>
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
