import React from 'react'
import ProductCard from './ProductCard.jsx';
import {cake} from '../jsonFiles/cake.js';

function Cake() {
  return (
    <>
        <h1>
            This is Cake Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {cake.map(key => 
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

export default Cake
