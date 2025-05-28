import React, { useContext, useState, useEffect } from "react";
import "../../css_part/proceed.css";
import { CartContext } from "../Cart";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Proceed = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const { state } = useContext(CartContext);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("foodio_user");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setEmail(parsedUser.email);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Flatten cart items from all categories
  const cartItems = Object.values(state.item)
    .flat()
    .filter((item) => item.cartAdded);

  //   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);


  useEffect(() => {
    const isCheckoutInProgress = localStorage.getItem("foodio_isCheckoutInProgress");
    const isOnCartPage = window.location.pathname === "/proceed";
  
    if (isCheckoutInProgress && isOnCartPage) {
      // alert("You returned without completing the payment!");
      toast.error("You returned without completing the payment!", {
        toastId: "payment-return-cancel"
      });
      setTimeout(()=>{
        localStorage.removeItem("foodio_isCheckoutInProgress");
      }, 3000)
    }
  }, []);


  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  // payment logic
  const handleCheckout = async () => {
    // if (!email || !email.includes("@")) {
    //   alert("Please enter a valid email address before proceeding.");
    //   return;
    // }
    
    const stripe = await stripePromise;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/payment/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, email, totalAmount }),
      }
    );

    const session = await response.json();

    localStorage.setItem("foodio_isCheckoutInProgress", "true");

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="order-container">
      <div className="delivery-form">
        <h2>Delivery Information</h2>
        
        <form>
          <div className="procced-row">
            <input 
              type="text" 
              placeholder="Username"
              className="proceed-username" 
              value={user && user.username} 
              readOnly
              />
          </div>
          <input 
            type="email"
            value={user && user.email} 
            className="proceed-email" 
            placeholder="Email address"
            readOnly
          />
          <input type="text" placeholder="Street" />
          <div className="procced-row">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="procced-row">
            <input type="text" placeholder="Zip code" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone" />
        </form>
      </div>

      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="totals">
          <div className="line">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="line">
            <span>Delivery Fee</span>
            <span>₹10</span>
          </div>
          <hr />
          <div className="line total">
            <strong>Total</strong>
            <strong>₹{totalAmount + 10}</strong>
          </div>
        </div>
        <button className="pay-btn" onClick={handleCheckout}>
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default Proceed;
