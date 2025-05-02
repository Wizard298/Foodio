import React from 'react';
import '../css_part/bgImg.css'
import { Link } from 'react-router-dom';

function BgImg() {


  return (
    <>
      {/* Image Part */}
      <div className="image">

        {/* Text Part */}
        <div className="hero-section">
          <h1>Premium fast food</h1>
          <p>You don’t have to travel to shop to get an original pizza... We’ll bring it to you!</p>
          <br />
          <Link to="/pizza">
            <button>ORDER NOW!</button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default BgImg;
