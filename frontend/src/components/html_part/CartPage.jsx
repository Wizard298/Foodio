import React, { useContext } from 'react';
import '../css_part/cartPage.css'
import { CartContext } from './Cart';
import { Link } from 'react-router-dom';

function CartPage() {
  const { state, increment, decrement, addToCart, clearCart } = useContext(CartContext);

  // Flatten all categories into one array and filter only cart items
  const cartItems = Object.values(state.item)
    .flat()
    .filter(item => item.cartAdded);

  // Calculate total quantity and amount
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="cart-page">
      <h1>🛒 Cart Page</h1>
      <br />

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
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
              {cartItems.map(item => (
                <tr key={item.id + item.category}>
                  <td>{item.name}</td>
                  <td><img src={item.img} alt="Error" style={{width: '85px'}}/></td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="cart-page-quantity-minus" onClick={() => decrement(item.id, item.category)}>-</button>
                    <input 
                      type="number" 
                      className="quantity-input-box" 
                      placeholder={item.quantity} 
                      min="1" 
                      max="10"
                    />
                    <button className="cart-page-quantity-plus" onClick={() => increment(item.id, item.category)}>+</button>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button className='cart-page-delete' onClick={()=>addToCart(item.id, item.category)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <br />

          <div className="cart-page-delete" style={{display: 'flex', justifyContent: "space-between"}}>
            <Link to="/" style={{marginLeft: '4%'}}>
              <button>Continue Shopping</button>
            </Link>
            <button onClick={() => clearCart()} style={{marginRight: '3%'}}>Clear Cart</button>
          </div>
        </>
      )}

      <br />


      <div className="cart-page-summary" style={{ marginTop: "20px", marginLeft: '4%' }}>
        <h3>Total Quantity: {totalQuantity}</h3> 
        <br />
        <h3>Total Amount: ₹{totalAmount}</h3> 
      </div>
    </div>
  );
}

export default CartPage;
