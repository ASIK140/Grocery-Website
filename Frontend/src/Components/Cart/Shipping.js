import React, { Fragment, useState } from "react";
import "./Shipping.css";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import Footer from "../Footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { setshippingInfo } from "../../Reducers/CartReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Shipping = ({ history }) => {
  const [address, setAddress] = useState("nabinarag");
  const [city, setCity] = useState("malda");
  const [state, setState] = useState("wb");
  const [country, setCountry] = useState("india");
  const [pinCode, setPinCode] = useState("732001");
  const [phoneNo, setPhoneNo] = useState("7541635298");
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const shippingSubmit = (event) => {
    event.preventDefault();
    Dispatch(
      setshippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    Navigate("/order/confirm");
  };
  return (
    <Fragment>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>

                <option value="India">India</option>
              </select>
            </div>

            <div>
              <ApartmentIcon />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">States</option>

                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Shipping;
