import React, { useEffect, useState } from 'react'
import '../css_part/navbar.css'
import '../css_part/bgImg.css'
import { Link, useLocation } from 'react-router-dom';
// import BgImg from './BgImg';

// function Navbar(props) {
function Navbar() {

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  

  // if(location.pathname !== '/' || location.pathname !== '/home'){
    //   setScrolled(true);
    // }
    
    // setScrolled(location.pathname !== '/')
    
  useEffect(()=>{
    const handleScroll = () => {
      setScrolled(window.scrollY > 11);
    }
  
    if(location.pathname !== '/' && location.pathname !== '/home'){
      setScrolled(true);
    }
    else{
      window.addEventListener('scroll', handleScroll);
    }
    

    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  // if user clicks on the screen rather than icon
  const [isOpen, setIsOpen] = useState(false);
  const handleResponsive = () => {
    setIsOpen(!isOpen);
  };
  // const handleResponsive = () => {
  //   let getToggle = document.querySelector('.toggle1');

  //   getToggle.classList.toggle('toggle2');
  //   // console.log('success');
  // }

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".toggle-links") && !e.target.closest(".nav-size-icon")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      {/* Navbar Part */}
      <header className={`${scrolled? 'header-scroll': 'header-default'}`}>
        <div className="navbar">

            <div className="navbar-part-1">

                <div className="nav-logo">
                  <div className='responsive-logo-edit'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list nav-size-icon" viewBox="0 0 16 16" onClick={handleResponsive}>
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <h2 className='nav-logo-visible'>Foodio</h2>
                  </div>

                  <Link to="/login" className='nav-login-visible'>
                    <div>
                      Log In
                    </div>
                  </Link>
                </div>

                <div className="nav-logo-heading">
                  <h2>Foodio</h2>
                </div>

                {/* Toggle Menu */}
                {/* <div className="toggle-links toggle1"> */}
                <div className={`toggle-links toggle1 ${isOpen ? "toggle2" : ""}`}>
                  <Link to="/home">
                    <div className="nav-link nav-link-home">
                      Home
                    </div>
                  </Link>
                  <Link to="/home">
                    <div className="nav-link">
                      About Us
                    </div>
                  </Link>
                  <Link to="/home">
                    <div className="nav-link">
                      Services
                    </div>
                  </Link>
                  <Link to="/home">
                    <div className="nav-link">
                      Contact Us
                    </div>
                  </Link>
                </div>
            </div>

            <div className="navbar-part-2">
                <div className="nav-search">
                  <label htmlFor="search">Search </label>
                  <input type="search" />
                </div>
                <Link to="/login">
                  <div className="nav-login">
                    Log In
                  </div>
                </Link>
            </div>

        </div>

      </header>
      
    </>
  )
}

export default Navbar
