import React, { useContext } from 'react'
import '../css_part/productCard.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './Cart';
import { toast } from 'react-toastify';

function ProductCard({id, img, name, price, description, quantity, category, cartAdded}) {
  const {increment, decrement, addToCart} = useContext(CartContext);
  const navigate = useNavigate();

  // Find the current item to get its quantity
  // const currentItem = items.find(item => item.id === id);
  // const quantity = currentItem?.quantity || 1;

  const navigateInformation = () =>{
    const user = JSON.parse(localStorage.getItem("foodio_user"));
  
    if (!user) {
      // show a toast warning
      toast.warning("You must be logged in to view details!", {
        toastId: "auth-warning",
      });
      return;
    }

    navigate('/addToCart', {
      state: {
        id: id,
        img: img,
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        category: category,
        cartAdded: cartAdded,
      }
    })
  }

  // console.log("Quantity:", quantity)

  return (
    <>
      <div className="card">
        <img className='card-img' src={img} alt="Error" onClick={navigateInformation} />
        <div className="quantity">
          <button className="quantity-minus" aria-label="Decrease" onClick={()=>decrement(id, category)}>-</button>
          <input 
            type="number" 
            className="quantity-input-box" 
            placeholder={quantity} 
            min="1" 
            max="10"
            readOnly
          />
          <button className="quantity-plus" aria-label="Increase" onClick={()=>increment(id, category)}>+</button>
        </div>
        <div className="card-heading">
            <h2 onClick={navigateInformation}>{name}</h2>
            <div className="rating">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
            </div>
        </div>


        <div className="card-price" onClick={navigateInformation}>
          <p>₹{price}</p>
        </div>

        <div className="card-text" onClick={navigateInformation}>
            <p>{description}</p>
        </div>


        <div className="card-button">
            {cartAdded ? 
            <button onClick={()=>addToCart(id, category)} style={{backgroundColor: "#e70000"}}>Remove From Cart</button>
            : 
            <button onClick={()=>addToCart(id, category)} style={{backgroundColor: "black"}}>Add To Cart</button>
            }
        </div>
      </div>
    </>
  )
}

export default ProductCard
