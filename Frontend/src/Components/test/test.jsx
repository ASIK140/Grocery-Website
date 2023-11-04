import axios from "axios";
import React from "react";

function Test() {
  const [image, setImage] = React.useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const send = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("name", "ASIK");
    data.append("roll", 38);
    console.log(data);
  };
  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default Test;
