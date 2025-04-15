import React, { createContext, useReducer } from 'react'
import {burger} from '../jsonFiles/burger.js';
import {cake} from '../jsonFiles/cake.js';
import {chocolate} from '../jsonFiles/chocolate.js';
import {noodles} from '../jsonFiles/noodles.js';
import {pasta} from '../jsonFiles/pasta.js';
import {pizza} from '../jsonFiles/pizza.js';
import {rolls} from '../jsonFiles/rolls.js';
import {sandwich} from '../jsonFiles/sandwich.js';
import {food} from '../jsonFiles/food.js';

import { reducer } from './Reducer.jsx';

// Creating context 
export const CartContext = createContext();

const allItems = {
  burger,
  cake,
  chocolate,
  noodles,
  pasta,
  pizza,
  rolls,
  sandwich,
  food,
};

const initialState = {
    item: allItems,
    cart: [],
    totalAmount: 0, 
    totalItems: 0,
}

function Cart({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const increment = (id, category) => {
      return dispatch({
          type: "INCREMENT",
          payload: id,
          category: category,
        });
      }
      
    const decrement = (id, category) => {
      return dispatch({
          type: "DECREMENT",
          payload: id,
          category: category,
      });
    }

    const addToCart = (id, category) => {
      return dispatch({
          type: "ADD_TO_CART",
          payload: id,
          category: category,
      });
    }

  return (
    <>
      <CartContext.Provider value={{ state, increment, decrement, addToCart}}>
        {children}
      </CartContext.Provider>

        {/* { children } means it accepts nested components inside it — like: */}
        {/* 
            <Cart>
                <Pizza />
            </Cart> 
        */}
    </>
  )
}

export default Cart;




