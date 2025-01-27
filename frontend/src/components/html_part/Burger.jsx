import React from 'react'
import ProductCard from './ProductCard.jsx';
import {burger} from '../jsonFiles/burger.js';

function Burger() {
  return (
    <>
        <h1>
        This is Burger Page
        </h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {burger.map(key => 
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

export default Burger;
