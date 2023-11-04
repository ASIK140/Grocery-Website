import React from "react";
import CatCard from "./CatCard";
import ver from "../../Ass/pngegg.png";
import "./CatCard.css";
const cat = {
  Rice: { name: "Rice", img: "https://pngimg.com/d/rice_PNG17.png" },
  Flakes: {
    name: "Rice Flakes",
    img: "https://punjabigroceries.com/cdn/shop/products/PohaMedium.jpg?v=1676756729",
  },
  Podi: {
    name: "Puttu Podi",
    img: "https://cappacalefoods.com/cdn/shop/products/steamed-puttu-podi.jpg?v=1671540146",
  },
  Noodles: {
    name: "Noodles",
    img: "https://www.pngall.com/wp-content/uploads/5/Noodles-PNG-Image.png",
  },
  Vermicelli: {
    name: "Vermicelli",
    img: ver,
  },
  Pasta: {
    name: "Pasta",
    img: "https://www.pngitem.com/pimgs/m/638-6384918_thrill-hunt-alfredo-pasta-hd-png-download.png",
  },
  Muesli: {
    name: "Muesli",
    img: "https://www.pngmart.com/files/5/Granola-PNG-Image.png",
  },
  Rusk: { name: "Rusk", img: "https://pngimg.com/d/rusk_PNG5.png" },
  Cookies: {
    name: "Cookies",
    img: "https://www.freepnglogos.com/uploads/cookie-png/cookie-upfronts-scent-fresh-baked-chocolate-chip-cookies-28.png",
  },
  Spicy: {
    name: "Spicy Crispy",
    img: "https://developer.android.com/static/codelabs/basic-android-kotlin-training-internet-images/img/467c213c859e1904.png",
  },
  Sweet: {
    name: "Sweet Crunchy",
    img: "https://developer.android.com/static/codelabs/basic-android-kotlin-training-internet-images/img/467c213c859e1904.png",
  },
};
function Categories() {
  return (
    <div className="Cate">
      <CatCard cat={cat.Rice} />
      <CatCard cat={cat.Flakes} />
      <CatCard cat={cat.Podi} />
      <CatCard cat={cat.Noodles} />
      <CatCard cat={cat.Vermicelli} />
      <CatCard cat={cat.Cookies} />
      <CatCard cat={cat.Pasta} />
      <CatCard cat={cat.Muesli} />
      <CatCard cat={cat.Rusk} />
      <CatCard cat={cat.Spicy} />
    </div>
  );
}

export default Categories;
