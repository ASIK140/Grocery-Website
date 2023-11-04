import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../../Reducers/UserReducer";
import axios from "axios";
export default function BasicTable() {
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.allUser);
  const { loading } = useSelector((state) => state.user);
  const createUser = async (id) => {
    const text = "Do you wnat Create User to this admin?";
    if (window.confirm(text) === true) {
      try {
        const { data } = await axios.put(`api/v1/admin/user/${id}`, {
          role: "user",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const createAdmin = async (id) => {
    const text = "Do you wnat create Admin to this user?";
    if (window.confirm(text) === true) {
      try {
        const { data } = await axios.put(`api/v1/admin/user/${id}`, {
          role: "admin",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteUser = async (Id) => {
    const text = "Do you wnat Delete this User?";
    if (window.confirm(text) === true) {
      try {
        const { data } = await axios.delete(`/api/v1/admin/user/${Id}`);
        alert(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    Dispatch(getAllusers());
  }, [Dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Action&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                user.map((u) => (
                  <TableRow>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell align="right">{u.role}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          deleteUser(u._id);
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      {u.role === "admin" ? (
                        <IconButton
                          onClick={() => {
                            createUser(u._id);
                          }}
                          aria-label="edit"
                        >
                          <PersonIcon color="secondary" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            createAdmin(u._id);
                          }}
                          aria-label="edit"
                        >
                          <PeopleIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
