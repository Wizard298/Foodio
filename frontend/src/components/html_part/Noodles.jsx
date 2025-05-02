import React, { useContext } from 'react'
import ProductCard from './ProductCard.jsx';
import { CartContext } from './Cart.jsx';
// import { noodles } from '../jsonFiles/noodles.js';

function Noodles() {
    const {state} = useContext(CartContext);
    const noodles = state.item.noodles;
  return (
    <>
        <h1>
            This is Noodles Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {noodles.map(item => 
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

export default Noodles
