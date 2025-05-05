import React, { useContext, useEffect } from 'react'
import '../css_part/main.css';
import '../css_part/bgImg.css'
import BgImg from './BgImg'
import ProductCard from './ProductCard'
// import { food } from '../jsonFiles/food.js'
// import Explore from './Explore.jsx';
import Explore1 from './Explore1.jsx';
import Explore2 from './Explore2.jsx';
import { CartContext } from './Cart.jsx';


function Main() {
  const {state} = useContext(CartContext);
  console.log(state.item)
  const food = state.item.food;

  useEffect(()=>{
    food.map((key) => {
      console.log(key.description)
      return null;
    })
  }, [food]);

  return (
    <>
        <BgImg/>

        <Explore1/>

        <br />

        <div className='top-dishes'>
          <h1 style={{fontWeight: '500', fontSize: '2.4rem'}}>Top Dishes For You</h1>
          <div className='card-part'>
            {food.map(item => 
              <ProductCard
                key = {item.id}
                id = {item.id}  
                img = {item.img}
                name = {item.name}
                price = {item.price}
                description = {item.description}
                quantity = {item.quantity}
                category={item.category}
                cartAdded={item.cartAdded}
              />
            )}
          </div>
        </div>
        
        <br />

        <Explore2/>
    </>
  )
}

export default Main
