import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css_part/addToCart.css'
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

function AddToCart() {
    // const [data, setData] = useState([]);
    // const { id } = useParams();

    // useEffect(() => {
    //     axios
    //       .get(`http://localhost:3500/allmedicines/${id}`)
    //       .then((res) => {
    //        // console.log(res.data.oneItem[0].name);
    //         setData(res.data.oneItem[0]);
    //       })
    //       .catch((err) => console.log(err));
    //   }, [id]);

    const location = useLocation();
    const {id, img, name, price, description, quantity, category, cartAdded} = location.state || {};

    console.log(id)
    console.log(img)
    console.log(name)
    console.log(price)
    console.log(quantity)
    console.log(category)
    console.log(cartAdded)


    // const editStyle ={
    //   width: "35vw",
    //   padding: "13px",
    //   fontSize: "18px",
    //   marginTop: 51
    // }

  return (
    <>
    
    <div className="addcart-page">

        <div className="addcart-img">
          <div className="addcart-define-img">
            <img src={img} alt="Error"/>
          </div>
        </div>

        <div className="addcart-div">
          <div className="addcart-div-part1">
            <h1 className="addtocart-heading">{name}</h1>
            <br />
            <p className="addtocart-para">{description}</p>
          </div>

          <div className="addcart-div-part2">
            <h3 className="addtocart-price">Rs. {price}</h3>
            <p className="addtocart-para">Inclusive of all taxes</p>

            <i>*This product cannot be returned for a refund or exchange</i>
            <br />

            <i>*Country of Origin: <b>India</b> </i>
            <br />

            <i>*Delivery Changes if applicable will be applied at checkout</i>
            <br />

            <button className="addToCart-button"
              // style={editStyle}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default AddToCart;