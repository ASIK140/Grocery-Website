import React from 'react'
import './Product.css'
import img from "../Ass/maggi.png"
function Product(props) {
  return (
    <div>
        <div className="products">
            
            <div className="product">
                <div className="pro-img">
                    <img src={img} alt="" />
                </div>
                <div className="pro-details">
                    <span id='name'>{props.name} <p>{props.wigth}g</p></span>
                    <span id='price'>₹{props.price}</span>
                </div>
                <div className="button">
                    <button>Add to Cart</button>
                </div>


            </div>
        </div>
    </div>
  )
}

export default Product