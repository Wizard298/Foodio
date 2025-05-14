import React, { useContext, useEffect } from "react";
import "../css_part/cartPage.css";
import { CartContext } from "./Cart";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CartPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("foodio_user");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      if (parsedUser.username === "admin" && parsedUser.email === "admin456@gmail.com") {
        toast.warning("Admin cannot go to cartPage!", {
          toastId: "admin-warning"
        })
        navigate("/");
      }
    }
  }, [navigate]);

  const { state, increment, decrement, addToCart, clearCart } = useContext(CartContext);

  // Flatten all categories into one array and filter only cart items
  const cartItems = Object.values(state.item)
    .flat()
    .filter((item) => item.cartAdded);

  // Calculate total quantity and amount
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="center">
          <div className="cart-link">
            <h1 className="cart-link-heading">Your cart is empty!</h1>
            <p>
              You have added <b>zero</b> items in your cart.{" "}
            </p>
            <p style={{ marginBottom: "11px" }}>
              Explore and add items you like!
            </p>
            <Link to="/">
              <button className="link-cart-buttn">Click to View Items</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center", fontSize: "2.1rem" }}>
            🛒 Cart Page
          </h1>
          <br /> <br />
          <table className="cart-page-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id + item.category}>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.img} alt="Error" style={{ width: "85px" }} />
                  </td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button
                      className="cart-page-quantity-minus"
                      onClick={() => decrement(item.id, item.category)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input-box"
                      placeholder={item.quantity}
                      min="1"
                      max="10"
                      readOnly
                    />
                    <button
                      className="cart-page-quantity-plus"
                      onClick={() => increment(item.id, item.category)}
                    >
                      +
                    </button>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    {/* <button className='cart-page-delete-btn' onClick={()=>addToCart(item.id, item.category)}>Delete</button> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => addToCart(item.id, item.category)}
                      width="21"
                      height="21"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <div
            className="cart-page-btn"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to="/" style={{ marginLeft: "5%" }}>
              <button className="cart-page-continue">Continue Shopping</button>
            </Link>
            <Link to="/proceed">
              <button className="cart-page-payment">Proceed To Checkout</button>
            </Link>
            <button
              className="cart-page-delete-btn"
              onClick={() => clearCart()}
              style={{ marginRight: "4%" }}
            >
              Clear Cart
            </button>
          </div>
          <br /> <br />
          <div
            className="cart-page-summary"
            style={{
              marginTop: "20px",
              marginLeft: "4%",
              display: "flex",
              gap: "325px",
            }}
          >
            <h1>Total Quantity: {totalQuantity}</h1>
            <br />
            <h1>Total Amount: ₹{totalAmount}</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
