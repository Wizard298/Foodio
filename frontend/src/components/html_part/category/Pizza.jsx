import React, { useContext } from "react";
import ProductCard from "../ProductCard.jsx";
// import {pizza} from '../jsonFiles/pizza.js';
import { CartContext } from "../Cart.jsx";
// import List from "../List.jsx";

function Pizza() {
  const { state } = useContext(CartContext);
  const pizza = state.item.pizza;
  return (
    <>
      <div style={{margin: "35px 0px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        {/* <List/> */}


        <h1 style={{textAlign: "center"}}>This Is Pizza Page</h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {pizza.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
              category={item.category}
              cartAdded={item.cartAdded}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Pizza;
