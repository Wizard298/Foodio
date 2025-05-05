import React, { useEffect, useState } from "react";
import "../../css_part/orderPage.css"; // optional for styling

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4500/admin/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-page">
      <h2>🧾 All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Ordered On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.userEmail}</td>
                <td>
                  <ul>
                    {order.cartItems?.map((item, j) => (
                      <li key={j}>
                        {item.name} × {item.quantity} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                {/* <td>{order.status}</td> */}
                <td>
                  <select
                    value={order.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        const res = await fetch(
                          `http://localhost:4500/admin/orders/${order._id}/status`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: newStatus }),
                          }
                        );
                        if (res.ok) {
                          // Update local state
                          setOrders((prev) =>
                            prev.map((o) =>
                              o._id === order._id
                                ? { ...o, status: newStatus }
                                : o
                            )
                          );
                        } else {
                          console.error("Failed to update status");
                        }
                      } catch (err) {
                        console.error("Error updating status:", err);
                      }
                    }}
                  >
                    <option value="placed">Order Placed</option>
                    <option value="pending">Pending</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderPage;
