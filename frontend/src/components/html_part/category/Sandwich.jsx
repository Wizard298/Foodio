import React, { useContext } from 'react'
import ProductCard from '../ProductCard.jsx';
import { CartContext } from '../Cart.jsx';
// import { sandwich } from '../jsonFiles/sandwich'

function Sandwich() {
    const {state} = useContext(CartContext);
    const sandwich = state.item.sandwich;
  return (
    <>
        <h1>
            This is Sandwich Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {sandwich.map(item => 
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

export default Sandwich
