import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Stack } from "@mui/material";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "./CreateProduct.css";
import axios from "axios";
function CreateProduct() {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCat] = useState("");
  const [description, setDes] = useState("");
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const Create = async () => {
    const fdata = new FormData();
    fdata.append("name", name);
    fdata.append("price", price);
    fdata.append("weight", weight);
    fdata.append("stock", stock);
    fdata.append("category", category);
    fdata.append("description", description);
    fdata.append("file", image);
    try {
      const { data } = await axios.post("/api/v1/product/new", fdata);
      toast.success("Product Created", {
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
      toast.error(error.response.statusText, {
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
  };
  return (
    <div className="createPage">
      <div className="con">
        <h3>Create Product</h3>
      </div>
      <form action="">
        <Stack direction={"column"} spacing={2}>
          <TextField
            size="small"
            value={name}
            onChange={(event) => {
              setname(event.target.value);
            }}
            label="Name"
            variant="outlined"
          />
          <TextField
            size="small"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            label="Price"
            variant="outlined"
          />
          <TextField
            size="small"
            value={weight}
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            label="Wieght"
            variant="outlined"
          />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              //   size="small"
              label="Category"
              onChange={(event) => {
                setCat(event.target.value);
              }}
            >
              <MenuItem value="Rice Flakes">Rice Flakes</MenuItem>
              <MenuItem value="Puttu Podi">Puttu Podi</MenuItem>
              <MenuItem value="Noodles">Noodles</MenuItem>
              <MenuItem value="Vermicelli">Vermicelli</MenuItem>
              <MenuItem value="Pasta">Pasta</MenuItem>
              <MenuItem value="Muesli">Muesli</MenuItem>
              <MenuItem value="Rusk">Rusk</MenuItem>
              <MenuItem value="Cookies">Cookies</MenuItem>
              <MenuItem value="Spicy Crispy">Spicy Crispy</MenuItem>
              <MenuItem value="Sweet Crunchy">Sweet Crunchy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            value={stock}
            onChange={(event) => {
              setStock(event.target.value);
            }}
            label="Stock"
            variant="outlined"
          />
          <input type="file" name="image" onChange={handleImage} />
          <TextField
            label="Description"
            multiline
            onChange={(event) => {
              setDes(event.target.value);
            }}
            value={description}
            maxRows={4}
          />
          <Button onClick={Create} variant="contained">
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateProduct;
