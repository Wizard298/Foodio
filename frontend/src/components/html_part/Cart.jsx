import React, { createContext, useReducer, useEffect } from 'react'
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
import { toast } from 'react-toastify';

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
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!user; // true if user exists

    // const [state, dispatch] = useReducer(reducer, initialState);
    // Load initial cart from localStorage if exists
    const savedCartState = JSON.parse(localStorage.getItem(`cart_${user?.email}`)) || initialState;
    const [state, dispatch] = useReducer(reducer, savedCartState);

    // Save to localStorage on cart updates
    useEffect(() => {
      if (isLoggedIn) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state));
      }
    }, [state, isLoggedIn, user?.email]);


    const increment = (id, category) => {
      if (!isLoggedIn){
        toast.warning("You have to login first before purchasing!", {
          toastId: "login-warning"
        });
        return;
      }
      return dispatch({
          type: "INCREMENT",
          payload: id,
          category: category,
        });
      }
      
    const decrement = (id, category) => {
      if (!isLoggedIn){
        toast.warning("You have to login first before purchasing!", {
          toastId: "login-warning"
        });
        return;
      }
      return dispatch({
          type: "DECREMENT",
          payload: id,
          category: category,
      });
    }

    const addToCart = (id, category) => {
      if (!isLoggedIn){
        toast.warning("You have to login first before purchasing!", {
          toastId: "login-warning"
        });
        return;
      }
      return dispatch({
          type: "ADD_TO_CART",
          payload: id,
          category: category,
      });
    }

    const clearCart = () => {
      return dispatch({
          type: "CLEAR_CART"
      });
    }

  return (
    <>
      <CartContext.Provider value={{ state, increment, decrement, addToCart, clearCart}}>
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




