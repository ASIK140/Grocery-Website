//React
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//MUI
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

//CSS
import "./login.css";

//Toast
import { toast } from "react-toastify";

function Login() {
  //Hook
  const Navigate = useNavigate();
  //Sign Up State
  const [name, setname] = useState("ASIK ARMAN");
  const [email, setemail] = useState("toufik1234@gmail.com");
  const [password, setePassword] = useState("toufik123");
  const [ConPassword, setConPassword] = useState("toufik123");
  const Regdata = { name, email, password, ConPassword };
  const [loading, setloading] = useState(false);
  //MUI
  const [show, setshow] = React.useState(false);
  //State Function

  //Axios Function
  const register = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post("/api/v1/register", Regdata);
      if (data.success) {
        setloading(false);
        toast.success("Register Successful", {
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
      }
    } catch (error) {
      setloading(false);
      window.alert("Error");
    }
  };

  return (
    <div>
      <div className="wrap">
        <div className="log">
          <form onSubmit={register}>
            <Stack direction={"column"} spacing={2} width={250}>
              <h1>SIGN UP</h1>
              <TextField
                id="outlined-basic"
                label="Name"
                required
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                size="small"
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
                id="outlined-basic"
                size="small"
                required
                label="Password"
                onChange={(e) => {
                  setePassword(e.target.value);
                }}
                value={password}
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
              <TextField
                id="outlined-basic"
                size="small"
                required
                label="Confirm Password"
                value={ConPassword}
                onChange={(e) => {
                  setConPassword(e.target.value);
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
              <Button type="submit" variant="contained">
                SIGN UP
              </Button>
              <span className="createAcc">
                Alredy have account?<Link to={"/login"}>Log in</Link>
              </span>
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
