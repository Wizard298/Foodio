import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart";

const Success = () => {
  // const [orders, setOrders] = useState([]);
  const { state, clearCart } = useContext(CartContext);
  // const user = JSON.parse(localStorage.getItem("foodio_user"));
  // const email = user?.email;

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/success?email=${email}`)
  //     .then((res) => res.json())
  //     // .then((data) => setOrders(data))
  //     .catch((err) => console.error(err));
  // }, [email]);

  // const handleDelete = async (orderId) => {
  //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/order/${orderId}`, {
  //     method: "DELETE",
  //   });

  //   // Update UI
  //   setOrders(orders.filter(order => order._id !== orderId));
  // };

  const hasSaved = useRef(false); // <-- This persists across renders

  useEffect(() => {
    const storedUser = localStorage.getItem("foodio_user");
    const email = storedUser ? JSON.parse(storedUser).email : null;

    // Flatten cart items from all categories
    const cartItems = Object.values(state.item)
      .flat()
      .filter((item) => item.cartAdded);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);


    if (cartItems.length && email && !hasSaved.current) {
      hasSaved.current = true; // Mark it saved

      fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/save-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, cartItems, totalAmount }),
      })
        .then((res) => res.text())
        .then((msg) => console.log(msg));

      clearCart();
    }

    localStorage.removeItem("foodio_isCheckoutInProgress");
  }, [clearCart, state.item]);

  return (
    <div className="success-page">
      <h2>Payment Successful!</h2>
      <p>🎉 Order Placed Successfully!</p>
      <br />
      <Link to="/myOrder">
        <button>View Orders</button>
      </Link>
    </div>
  );
};

export default Success;
