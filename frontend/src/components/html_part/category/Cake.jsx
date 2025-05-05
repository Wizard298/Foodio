import React, { useContext } from 'react'
import ProductCard from '../ProductCard.jsx';
import { CartContext } from '../Cart.jsx';
// import {cake} from '../jsonFiles/cake.js';

function Cake() {
    const {state} = useContext(CartContext);
    const cake = state.item.cake;

  return (
    <>
        <h1>
            This is Cake Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {cake.map(item => 
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

export default Cake
