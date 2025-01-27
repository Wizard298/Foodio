import React from 'react'
import ProductCard from './ProductCard.jsx';
import { noodles } from '../jsonFiles/noodles.js';

function Noodles() {
  return (
    <>
        <h1>
            This is Noodles Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {noodles.map(key => 
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

export default Noodles
