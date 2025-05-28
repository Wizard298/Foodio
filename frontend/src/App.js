import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/html_part/Navbar';
import Footer from './components/html_part/Footer';
import Main from './components/html_part/Main';
import AboutUs from './components/html_part/AboutUs';

import Login from './components/html_part/auth/Login';
import SignUp from './components/html_part/auth/SignUp';
import ForgotPassword from './components/html_part/auth/ForgotPassword';
import Profile from './components/html_part/profile/Profile';

import AddToCart from './components/html_part/AddToCart';
import ScrollToTop from './components/html_part/ScrollToTop';

import Pizza from './components/html_part/category/Pizza';
import Burger from './components/html_part/category/Burger';
import Cake from './components/html_part/category/Cake';
import Pasta from './components/html_part/category/Pasta';
import Sandwich from './components/html_part/category/Sandwich';
import Chocolate from './components/html_part/category/Chocolate';
import Noodles from './components/html_part/category/Noodles';
import Rolls from './components/html_part/category/Rolls';

import Cart from './components/html_part/Cart';
import CartPage from './components/html_part/CartPage';
import Proceed from './components/html_part/payment/Proceed';
import Success from './components/html_part/payment/Success';
import Cancel from './components/html_part/payment/Cancel';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFood from './components/html_part/admin/AddFood';
import OrderPage from './components/html_part/admin/OrderPage';
import MyOrder from './components/html_part/MyOrder';
import EditProfile from './components/html_part/profile/EditProfile';
import Browse from './components/html_part/Browse';

function App() {
  const location = useLocation();
  const renderLogin = location.pathname !== '/login';
  const renderSignUp = location.pathname !== '/signup';
  const renderForgot = location.pathname !== '/forgot';

  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} newestOnTop={true} />
      {/* {renderLogin && renderSignUp && renderForgot && <Navbar/>} */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <ScrollToTop/>

        <Routes>
          <Route path='/' element={<Cart> <Main/> </Cart>} />
          
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot' element={<ForgotPassword/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/browse' element={<Browse searchQuery={searchQuery} />} />

          <Route path='/profile' element={<Profile/>} />
          <Route path='/editProfile' element={<EditProfile/>} />

          <Route path='/pizza' element={<Cart> <Pizza/> </Cart>} />
          <Route path='/burger' element={ <Cart> <Burger/> </Cart>} />
          <Route path='/cake' element={<Cart> <Cake/> </Cart>} />
          <Route path='/rolls' element={<Cart> <Rolls/> </Cart>} />
          <Route path='/pasta' element={<Cart> <Pasta/> </Cart>} />
          <Route path='/chocolate' element={<Cart> <Chocolate/> </Cart>} />
          <Route path='/noodles' element={<Cart> <Noodles/> </Cart>} />
          <Route path='/sandwich' element={<Cart> <Sandwich/> </Cart>} />
          <Route path='/addToCart' element={<Cart> <AddToCart/> </Cart> } />
          <Route path='/cartPage' element={ <Cart> <CartPage/> </Cart> } />

          {/* payment */}
          <Route path='/proceed' element={<Cart> <Proceed/> </Cart>} />
          <Route path='/success' element={<Success/>} />
          <Route path='/cancel' element={<Cancel/>} />


          <Route path='/myOrder' element={<MyOrder/>} />


          {/* admin */}
          <Route path='/admin/addFood' element={<AddFood/>} />
          <Route path='/admin/orders' element={<OrderPage/>} />
        </Routes>


      {renderLogin && renderSignUp && renderForgot && <Footer/>}
    </>
  );
}

export default App;

// https://websitedesignforrestaurant.com/
