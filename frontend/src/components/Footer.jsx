import React from "react";
import "../style/footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter-container">
        <div className="newsletter-text">
          <div className="title">Subscribe our Newsletter</div>
          <div className="description">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</div>
        </div>
        <div className="newsletter-form">
          <input type="email" className="newsletter-input" placeholder="Your email address" />
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div className="social-icons">
          <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon pinterest"><i className="fab fa-pinterest-p"></i></a>
          <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-column">
          <div className="logo">
            <img src="/img/Logo.png" alt="Logo" />
          </div>
          <p className="footer-text">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
          </p>
          <div className="contact-info"><span className="contact">(219) 555-0114</span> or <span className="contact">Proxy@gmail.com</span></div>
        </div>

        <div className="footer-column">
          <h4>My Account</h4>
          <ul className="footer-links">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Order History</a></li>
            <li><a href="#">Shopping Cart</a></li>
            <li><a href="#">Wishlist</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Helps</h4>
          <ul className="footer-links">
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Proxy</h4>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><a href="#">Fruit & Vegetables</a></li>
            <li><a href="#">Meat & Fish</a></li>
            <li><a href="#">Bread & Bakery</a></li>
            <li><a href="#">Beauty & Health</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Ecobazar eCommerce © 2021. All Rights Reserved</p>
        <div className="footer-payment">
          <img src="/img/ApplePay.png" alt="Apple Pay" />
          <img src="/img/Visa.png" alt="Visa" />
          <img src="/img/Discover.png" alt="Discover" />
          <img src="/img/Mastercard.png" alt="Mastercard" />
          <img src="/img/Cart.png" alt="Secure Payment" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
