import React from 'react'
import ProductCard from './ProductCard.jsx';
import { pasta } from '../jsonFiles/pasta.js';

function Pasta() {
  return (
    <>
        <h1>
            This is Pasta Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {pasta.map(key => 
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

export default Pasta
