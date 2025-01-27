import React from 'react'
import ProductCard from './ProductCard.jsx';
import { sandwich } from '../jsonFiles/sandwich'

function Sandwich() {
  return (
    <>
        <h1>
            This is Sandwich Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {sandwich.map(key => 
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

export default Sandwich
