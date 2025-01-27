import React from 'react'
import '../css_part/productCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({img, name, price, description}) {
  const navigate = useNavigate();
  const navigateInformation = () =>{
    navigate('/addToCart', {
      state: {
        img: img,
        name: name,
        price: price,
        description: description
      }
    })
  }

  return (
    <>
      <div className="card">
        <img className='card-img' src={img} alt="Error" onClick={navigateInformation} />
        <div className="card-heading">
            <h2 onClick={navigateInformation}>{name}</h2>
            <div className="rating">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
            </div>
        </div>

        {/* <br /> */}

        <div className="card-price" onClick={navigateInformation}>
            <p>₹{price}</p>
        </div>

        <div className="card-text" onClick={navigateInformation}>
            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, id provident doloribus perspiciatis dicta perferendis voluptates eum inventore qui fugit similique?</p> */}
            <p>{description}</p>
        </div>

        {/* <br /> */}

        <div className="card-button">
            <button>Add To Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard
