import React, { useEffect, useState } from "react";

const Success = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:4500/payment/success?email=${email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [email]);

  const handleDelete = async (orderId) => {
    await fetch(`http://localhost:4500/payment/order/${orderId}`, {
      method: "DELETE",
    });

    // Update UI
    setOrders(orders.filter(order => order._id !== orderId));
  };

  return (
    <div className="success-page">
      <h2>🎉 Order Placed Successfully!</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Status: {order.status}</h3>
          <ul>
            {order.cartItems.map((item, index) => (
              <li key={index}>
                {item.quantity} × {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <p>Total: ₹{order.totalAmount}</p>
          {order.status === "completed" && (
            <button onClick={() => handleDelete(order._id)}>🗑 Delete Order</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Success;
