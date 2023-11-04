import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//Redux
import { getUser, setAuth } from "../../../Reducers/UserReducer";
//Axios
import { useDispatch, useSelector } from "react-redux";
//MUI
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../../Loader/Loader";
//CSS
import "./login.css";
//Toast
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  //Hook
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  //Sign Up State

  const [email, setemail] = useState("asiksk137@gmail.com");
  const [password, setePassword] = useState("asiksk140");
  const logdata = { email, password };
  const [loading, setloading] = useState(false);
  //MUI

  const [show, setshow] = React.useState(false);
  //Axios
  const signin = async (event) => {
    event.preventDefault();
    // setloading(true);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post("/api/v1/login", logdata, config);
      Dispatch(getUser(res.data.user));
      Dispatch(setAuth(true));
      setloading(false);
      toast.success("Login Successful", {
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
    } catch (error) {
      setloading(false);
      console.log("error");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="wrap">
            <div className="log">
              <form onSubmit={signin}>
                <Stack direction={"column"} spacing={2} width={250}>
                  <h1>LOGIN</h1>
                  <TextField
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <EmailIcon color="primary" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setePassword(e.target.value);
                    }}
                    type={show ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setshow(!show);
                            }}
                            aria-label="delete"
                          >
                            {show ? (
                              <VisibilityOff color="primary" />
                            ) : (
                              <VisibilityIcon color="primary" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <span className="Forgot">Forgot Password?</span>
                  <Button type="submit" size="large" variant="contained">
                    LOGIN
                  </Button>
                  <span className="createAcc">
                    Create Account?<Link to={"/register"}>Sign Up</Link>{" "}
                  </span>
                </Stack>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
