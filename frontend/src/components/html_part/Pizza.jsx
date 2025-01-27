import React from 'react'
import ProductCard from './ProductCard.jsx';
import {pizza} from '../jsonFiles/pizza.js';

function Pizza() {
  return (
    <>
    <h1>
      This is pizza Page
    </h1>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {pizza.map(key => 
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

export default Pizza
