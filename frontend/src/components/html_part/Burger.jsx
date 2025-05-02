import React, { useContext } from 'react'
import ProductCard from './ProductCard.jsx';
// import {burger} from '../jsonFiles/burger.js';
import { CartContext } from './Cart.jsx';

function Burger() {
  const {state} = useContext(CartContext);
  const burger = state.item.burger;
  return (
    <>
        <h1>
          This is Burger Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {burger.map(item => 
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

export default Burger;
