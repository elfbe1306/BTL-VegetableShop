import React , {useState} from "react";
import "../Header/header.css";
import { useLocation } from 'react-router-dom'; //levy add

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //levy làm
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/blog':
        return 'Blog';
      case '/vegetable':
        return 'Vegetable';
      case '/contact':
        return 'Contact';
      case '/about':
        return 'About';
      case '/faqs':
        return 'Faqs';
      case '/shoppingcart':
        return 'Shopping cart';
      default:
        return 'Home';
    }
  };

  return (
    <header className="header">
      <div className="top-bar">
        <p className="store-location">
          <span className="material-symbols-outlined">location_on</span> Store Location: Lincoln- 344, Illinois, Chicago, USA
        </p>
        <div className="top-bar-right">
          <div className="selector">
            <span className="language-selector">Eng <i className="fa-solid fa-chevron-down fa-sm"></i></span>
            <span className="currency-selector">USD <i className="fa-solid fa-chevron-down fa-sm"></i></span>
          </div>
          <span className="top-bar-divider"></span>
          <div>
            <span><a href="#" className="auth-links">Sign In</a> / <a href="#" className="auth-links">Sign Up</a></span>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="/img/Logo-black.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className="search-input" placeholder="Search" />
          <button className="search-button">Search</button>
        </div>
        <div className="user-actions">
          <span className="material-symbols-outlined favorite-icon">favorite</span>
          <span className="divider"></span>
          <div className="cart">
            <span className="material-symbols-outlined cart-icon">shopping_bag</span>
            <span className="cart-badge">2</span>
            <div>
              <div className="cart-text">Shopping cart:</div>
              <div className="cart-value">$57.00</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="nav-bar">
        <div className="hamburger" onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li><a href="#" className="nav-link">Home <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav-link">Shop <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav-link">Pages <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav-link">Blog <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav-link">About Us</a></li>
          <li><a href="#" className="nav-link">Contact Us</a></li>
        </ul>
        <div className="phone-number">
          <span className="material-symbols-outlined">phone_in_talk</span>
          <span className="number">(219) 555-0114</span>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="breadcrumb-address">
            <span className="material-symbols-outlined">home</span>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className="page">{getPageTitle()}</span> //levy sửa chút
        </div>
      </div>
    </header>
  );
};

export default Header;
