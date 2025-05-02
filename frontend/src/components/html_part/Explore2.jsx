import React from "react";
import '../css_part/explore.css'
import img5 from '../image_part/pasta.jpg';
import img6 from '../image_part/sandwich.jpg';
import img7 from '../image_part/chocolate.jpg';
import img8 from '../image_part/noodles.jpg';
import { Link } from "react-router-dom";

function Explore2() {
  return (
    <>
    <div className="explore">
        <div>
            <h1 className="explore-heading">
                Explore More!
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

            {/* choclate */}
        </div>
    </div>
    </>
  );
}

export default Explore2;

// Go to iStock images
