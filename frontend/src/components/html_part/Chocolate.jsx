import React from 'react'
import ProductCard from './ProductCard.jsx';
import { chocolate } from '../jsonFiles/chocolate.js';

function Chocolate() {
  return (
    <>
        <h1>
            This is Chocolate Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {chocolate.map(key => 
                <ProductCard
                    img = {key.img}
                    name = {key.name}
                    price = {key.price}
                    description = {key.description}
                />
            )}
        </div>
    </>
  )
}

export default Chocolate
