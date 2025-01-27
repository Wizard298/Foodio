import React from 'react'
import '../css_part/footer.css';
// import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Info</h4>
            <ul className="links">
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/service">Services</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/postjob">Post Job</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="links">
              <li><a href="/home/webDeveloper">Web Developer</a></li>
              <li><a href="/home/logoDesign">Logo Designs</a></li>
              <li><a href="/home/graphicDesign">Graphic Design</a></li>
              <li><a href="/home/webDeveloper">Web Design</a></li>
              <li><a href="/home/appDeveloper">App Developer</a></li>
              <li><a href="/home/dataScientist">Data Scientists</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="links">
              <li><a href="/home">Customer Agreement</a></li>
              <li><a href="/home">Privacy Policy</a></li>
              <li><a href="/home">GDPR</a></li>
              <li><a href="/home">Security</a></li>
              <li><a href="/home">Testimonials</a></li>
              <li><a href="/home">Media Kit</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="p-0">Newsletter</h4>
            <p>
              Subscribe to our newsletter for a weekly dose
              of news, updates, helpful tips, and
              exclusive offers.
            </p>
            <form action="/home">
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

