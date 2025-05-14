import React, { useEffect, useState } from 'react';
import '../css_part/myOrder.css'; // Custom CSS

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('foodio_user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-orders/${user.email}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-orders/${orderId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        alert("Order deleted successfully.");
      } else {
        alert("Failed to delete order.");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="my-orders-container">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <ul>
                    {order.cartItems.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(order._id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrder;
