import React from 'react';
import './App.css';
import Navbar from './components/html_part/Navbar';
import Footer from './components/html_part/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './components/html_part/Main';
import Login from './components/html_part/Login';
import Pizza from './components/html_part/Pizza';
import AddToCart from './components/html_part/AddToCart';
import ScrollToTop from './components/html_part/ScrollToTop';
import Burger from './components/html_part/Burger';
import Cake from './components/html_part/Cake';
import Pasta from './components/html_part/Pasta';
import Sandwich from './components/html_part/Sandwich';
import Chocolate from './components/html_part/Chocolate';
import Noodles from './components/html_part/Noodles';
import Rolls from './components/html_part/Rolls';
import SignUp from './components/html_part/SignUp';
import ForgotPassword from './components/html_part/ForgotPassword';
import AboutUs from './components/html_part/AboutUs';
import Cart from './components/html_part/Cart';

function App() {
  const location = useLocation();
  const renderLogin = location.pathname !== '/login';
  const renderSignUp = location.pathname !== '/signup';
  const renderForgot = location.pathname !== '/forgot';
  return (
    <>
      {/* {renderLogin && renderSignUp && renderForgot && <Navbar/>} */}
      <Navbar/>

      <ScrollToTop/>

        <Routes>
          {/* <Route path='/' element={<Main/>} /> */}
          <Route path='/' element={<Cart> <Main/> </Cart>} />
          {/* <Route path='/home' element={<Main/>} /> */}
          
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot' element={<ForgotPassword/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/addToCart' element={<AddToCart/>} />

          {/* <Route path='/pizza' element={<Pizza/>} /> */}
          <Route path='/pizza' element={<Cart> <Pizza/> </Cart>} />
          <Route path='/burger' element={ <Cart> <Burger/> </Cart>} />
          <Route path='/cake' element={<Cart> <Cake/> </Cart>} />
          <Route path='/rolls' element={<Cart> <Rolls/> </Cart>} />
          <Route path='/pasta' element={<Cart> <Pasta/> </Cart>} />
          <Route path='/chocolate' element={<Cart> <Chocolate/> </Cart>} />
          <Route path='/noodles' element={<Cart> <Noodles/> </Cart>} />
          <Route path='/sandwich' element={<Cart> <Sandwich/> </Cart>} />
        </Routes>


      {renderLogin && renderSignUp && renderForgot && <Footer/>}
    </>
  );
}

export default App;

// https://websitedesignforrestaurant.com/
