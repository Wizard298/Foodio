import React, { useContext } from 'react'
import ProductCard from '../ProductCard.jsx';
import { CartContext } from '../Cart.jsx';
// import { rolls } from '../jsonFiles/rolls.js'

function Rolls() {
    const {state} = useContext(CartContext);
    const rolls = state.item.rolls;
  return (
    <>
        <h1>
            This is Rolls Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {rolls.map(item => 
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

export default Rolls
