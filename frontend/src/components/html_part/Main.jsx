import React, { useEffect } from 'react'
import '../css_part/main.css';
import BgImg from './BgImg'
import ProductCard from './ProductCard'
import { food } from '../jsonFiles/food.js'
// import Explore from './Explore.jsx';
import Explore1 from './Explore1.jsx';
import Explore2 from './Explore2.jsx';


function Main() {
  
  useEffect(()=>{
    food.map((key) => {
      console.log(key.description)
      return null;
    })
  }, []);

  return (
    <>
        <BgImg/>

        {/* <Explore/> */}
        <Explore1/>

        <br />

        <div className='top-dishes'>
          <h1 style={{fontWeight: '500', fontSize: '2.4rem'}}>Top Dishes For You</h1>
          <div className='card-part'>
            {food.map(key => 
              <ProductCard
                img = {key.img}
                name = {key.name}
                price = {key.price}
                description = {key.description}
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
