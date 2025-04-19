import React, { useEffect, useState } from 'react'
import '../css_part/navbar.css'
import '../css_part/bgImg.css'
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


function Navbar() {

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // Store logged-in user info


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Parse user data
    }
  }, []);
    
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

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    toast.success(" Logged Out Successfully!...", {
      toastId: "logged-out-navbar"
    });
    setTimeout(() => {
      setUser(null); // Reset state
      window.location.reload(); // Refresh page to reflect changes
    }, 2100);
  };

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

                  <div style={{display: 'flex', alignItems: "center", gap: "25px"}}>
                    <Link to="/cartPage">
                      {/* <div>
                        <sup>{'3'}</sup>
                      </div> */}
                      <div style={{paddingTop: "2px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                      </div>
                    </Link>

                    {user?(
                      <>
                        <div className="dropdown">
                          {/* <button className="dropbtn">Dropdown</button> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle profile-icon" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                          </svg>
                          <div className="dropdown-content">
                            <Link to="/profile" className='dropdown-profile'>View Profile</Link>
                            <Link onClick={handleLogout}  className='dropdown-logout'>Log Out</Link>
                          </div>
                        </div>
                      </>
                      ) : (
                      <>
                        <Link to="/login">
                          <div className="nav-login-visible" style={{fontSize: "18px"}}>
                            Log In
                          </div>
                        </Link>
                      </>
                      )
                    }
                  </div>
                </div>

                <div className="nav-logo-heading">
                  <h2>Foodio</h2>
                </div>

                {/* Toggle Menu */}
                {/* <div className="toggle-links toggle1"> */}
                <div className={`toggle-links toggle1 ${isOpen ? "toggle2" : ""}`}>
                  <Link to="/">
                    <div className="nav-link nav-link-home">
                      Home
                    </div>
                  </Link>
                  <Link to="/about">
                    <div className="nav-link">
                      About Us
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="nav-link">
                      Services
                    </div>
                  </Link>
                  <Link to="/">
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
                <Link to="/cartPage">
                {/* <div>
                      <sup>{'3'}</sup>
                    </div> */}
                  <div style={{paddingTop: "2px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                  </div>
                </Link>
                {user?(
                  <>
                    <div className="dropdown">
                      {/* <button className="dropbtn">Dropdown</button> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle profile-icon" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                      </svg>
                      <div className="dropdown-content">
                        <Link to="/profile" className='dropdown-profile'>View Profile</Link>
                        <Link onClick={handleLogout}  className='dropdown-logout'>Log Out</Link>
                      </div>
                    </div>
                  </>
                 ) : (
                  <>
                    <Link to="/login">
                      <div className="nav-login" style={{fontSize: "18px"}}>
                        Log In
                      </div>
                    </Link>
                  </>
                  )
                }
            </div>

        </div>

      </header>
      
    </>
  )
}

export default Navbar
