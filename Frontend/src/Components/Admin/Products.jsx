import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "./Dash.css";
import axios from "axios";
import Loader from "../Loader/Loader";
export default function Products() {
  const [products, setproducts] = React.useState([]);
  const [C_open, setC_open] = React.useState(false);
  const [U_open, setU_open] = React.useState(false);
  const [data, setdata] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const handleC_Open = () => {
    setC_open(!C_open);
  };
  const handleU_Open = (product) => {
    setU_open(!U_open);
    setdata(product);
  };
  const getProduct = async () => {
    try {
      setloading(true);
      const { data } = await axios.get("/api/v1/product");
      setproducts(data.product);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);
  const deleteProduct = async (Id) => {
    const text = "Do you wnat Delete this Product?";
    if (window.confirm(text) === true) {
      try {
        const { data } = await axios.delete(`/api/v1/product/${Id}`);
        toast.success(data.message, {
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
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="productList">
          {C_open && (
            <div className="addProduct">
              <div className="close">
                <IconButton onClick={handleC_Open}>
                  <CloseIcon fontSize="large" color="error" />
                </IconButton>
              </div>
              <CreateProduct />
            </div>
          )}
          {U_open && (
            <div className="addProduct">
              <div className="close">
                <IconButton
                  onClick={() => {
                    handleU_Open("");
                  }}
                >
                  <CloseIcon fontSize="large" color="error" />
                </IconButton>
              </div>
              <UpdateProduct product={data} />
            </div>
          )}
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                content="Addbutton"
                onClick={handleC_Open}
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Stack>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price&nbsp;</TableCell>
                  <TableCell align="right">Action&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product._id}</TableCell>
                      <TableCell align="right">{product.name}</TableCell>
                      <TableCell align="right">{product.price}&nbsp;</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteProduct(product._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleU_Open(product);
                          }}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Stack>
        </div>
      )}
    </>
  );
}
