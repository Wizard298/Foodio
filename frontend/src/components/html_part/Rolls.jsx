import React from 'react'
import ProductCard from './ProductCard.jsx';
import { rolls } from '../jsonFiles/rolls.js'

function Rolls() {
  return (
    <>
        <h1>
            This is Rolls Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {rolls.map(key => 
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

export default Rolls
