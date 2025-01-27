import React from "react";
import '../css_part/explore.css'
import img1 from '../image_part/pizza.jpg';
import img2 from '../image_part/burger.jpg';
import img3 from '../image_part/cake.jpg';
import img4 from '../image_part/rolls.jpg';
import img5 from '../image_part/pasta.jpg';
import img6 from '../image_part/sandwich.jpg';
import img7 from '../image_part/chocolate.jpg';
import img8 from '../image_part/noodles.jpg';
import { Link } from "react-router-dom";

function Explore() {
  return (
    <>
    <div className="explore">
        <div>
            <h1 className="explore-heading">
                Explore our menu
            </h1>
            <br />
            <p className="explore-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor debitis
                cum delectus cumque, similique minima ratione, deserunt voluptas modi
                exercitationem a reprehenderit, dignissimos possimus dolore voluptate
                incidunt! Quae iusto modi ratione sequi, atque quam velit!
            </p>
        </div>
        {/* <br /> */}

        <div className="categories">
            <div className="categ">
                <Link to="/pizza">
                    <img src={img1} alt="Pizza" />
                    {/* 612 * 408 */}
                    <div className="categ-text">Pizza</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/burger">
                    <img src={img2} alt="Burger" />
                    <div className="categ-text">Burger</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/cake">
                    <img src={img3} alt="Cake" />
                    <div className="categ-text">Cake</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/rolls">
                    <img src={img4} alt="Rolls" />
                    <div className="categ-text">Rolls</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/pasta">
                    <img src={img5} alt="Pasta" />
                    <div className="categ-text">Pasta</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/sandwich">
                    <img src={img6} alt="Sandwich" />
                    <div className="categ-text">Sandwich</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/chocolate">
                    <img src={img7} alt="Chocolate" />
                    <div className="categ-text">Chocolate</div>
                </Link>
            </div>
            <div className="categ">
                <Link to="/noodles">
                    <img src={img8} alt="Noodles" />
                    <div className="categ-text">Noodles</div>
                </Link>
            </div>

        </div>
    </div>
    </>
  );
}

export default Explore;

// Go to iStock images