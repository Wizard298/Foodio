import React, { useContext } from 'react'
import ProductCard from '../ProductCard.jsx';
// import {pizza} from '../jsonFiles/pizza.js';
import { CartContext } from '../Cart.jsx';

function Pizza() {
  const {state} = useContext(CartContext);
  const pizza = state.item.pizza;
  return (
    <>
    <h1>
      This is pizza Page
    </h1>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {pizza.map(item => 
        <ProductCard
          key = {item.id}
          id = {item.id}        
          img = {item.img}
          name = {item.name}
          price = {item.price}
          description = {item.description}
          quantity={item.quantity}
          category={item.category}
          cartAdded={item.cartAdded}
        />
      )}
    </div>

    </>
  )
}

export default Pizza
