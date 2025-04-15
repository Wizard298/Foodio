import React from 'react'
import '../css_part/footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Info</h4>
            <ul className="links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Post Job</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="links">
              <li><Link to="/webDeveloper">Web Developer</Link></li>
              <li><Link to="/logoDesign">Logo Designs</Link></li>
              <li><Link to="/graphicDesign">Graphic Design</Link></li>
              <li><Link to="/webDeveloper">Web Design</Link></li>
              <li><Link to="/appDeveloper">App Developer</Link></li>
              <li><Link to="/dataScientist">Data Scientists</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="links">
              <li><Link to="/">Customer Agreement</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">GDPR</Link></li>
              <li><Link to="/">Security</Link></li>
              <li><Link to="/">Testimonials</Link></li>
              <li><Link to="/">Media Kit</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="p-0">Newsletter</h4>
            <p>
              Subscribe to our newsletter for a weekly dose
              of news, updates, helpful tips, and
              exclusive offers.
            </p>
            <form action="/">
              <input type="text" placeholder="Your email" required/>
              <button type="submit">SUBSCRIBE</button>
            </form>
            {/* <div className="icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-github"></i>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer

