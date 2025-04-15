import React, { useContext } from 'react'
import ProductCard from './ProductCard.jsx';
import { CartContext } from './Cart.jsx';
// import { chocolate } from '../jsonFiles/chocolate.js';

function Chocolate() {
    const {state} = useContext(CartContext);
    const chocolate = state.item.chocolate;
  return (
    <>
        <h1>
            This is Chocolate Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {chocolate.map(item => 
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

export default Chocolate
