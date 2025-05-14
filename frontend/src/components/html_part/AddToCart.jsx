import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import '../css_part/addToCart.css'
import { toast } from 'react-toastify';
// import { CartContext } from './Cart';

function AddToCart() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("foodio_user"));
    
    if (!user) {
      setTimeout(()=>{
        toast.warning("You must be logged in to access that page!", {
          toastId: "manual-visit"
        });
      }, 1)
      return <Navigate to="/login" />;
    }

    const {id, img, name, price, description, quantity, category, cartAdded} = location.state || {};

    console.log(id)
    // console.log(img)
    // console.log(name)
    // console.log(price)
    // console.log(quantity)
    console.log(category)
    console.log(cartAdded)


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
            <br />

            <h3>{`Quantity Added: ${quantity}`}</h3>
            <br />

            <i>*This product cannot be returned for a refund or exchange</i>
            <br />

            <i>*Country of Origin: <b>India</b> </i>
            <br />

            <i>*Delivery Changes if applicable will be applied at checkout</i>
            <br />

            {/* <button className="addToCart-button"> Add To Cart </button> */}
            {cartAdded ? 
            <button className="addToCart-button" style={{backgroundColor: "green"}}> Added To Cart</button>
            :
            <button className="addToCart-button" style={{backgroundColor: "red"}}> Not Added To Cart </button>
            }
            
          </div>
        </div>
      </div>

    </>
  )
}

export default AddToCart;