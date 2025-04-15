import React, { useContext } from 'react'
import ProductCard from './ProductCard.jsx';
import { CartContext } from './Cart.jsx';
// import { pasta } from '../jsonFiles/pasta.js';

function Pasta() {
    const {state} = useContext(CartContext);
    const pasta = state.item.pasta;
  return (
    <>
        <h1>
            This is Pasta Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {pasta.map(item => 
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

export default Pasta
