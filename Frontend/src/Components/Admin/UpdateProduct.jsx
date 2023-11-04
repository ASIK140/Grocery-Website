import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, Stack } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import "./CreateProduct.css";
import axios from "axios";
function CreateProduct({ product }) {
  const [name, setname] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [weight, setWeight] = useState("");

  const [stock, setStock] = useState(product.stock);
  const [category, setCat] = useState(product.category);
  const [description, setDes] = useState(product.description);
  const update = async () => {
    try {
      const { data } = await axios.put(`/api/v1/product/${product._id}`, {
        name,
        description,
        price,
        stock,
        category,
      });
      toast.success("Product Update", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {}
  };
  return (
    <div className="createPage">
      <div className="con">
        <h3>Update Product</h3>
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
          <TextField size="small" label="Image Url" variant="outlined" />
          <TextField
            label="Description"
            multiline
            onChange={(event) => {
              setDes(event.target.value);
            }}
            value={description}
            maxRows={4}
          />
          <Button onClick={update} variant="contained">
            Update
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateProduct;
