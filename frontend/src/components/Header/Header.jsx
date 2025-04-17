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
      <div className="top_bar">
        <p className="store_location">
          <span className="material-symbols-outlined">location_on</span> Store Location: Lincoln- 344, Illinois, Chicago, USA
        </p>
        <div className="top_bar_right">
          <div className="selector">
            <span className="language_selector">Eng <i className="fa-solid fa-chevron-down fa-sm"></i></span>
            <span className="currency_selector">USD <i className="fa-solid fa-chevron-down fa-sm"></i></span>
          </div>
          <span className="top_bar_divider"></span>
          <div>
            <span><a href="#" className="auth_links">Sign In</a> / <a href="#" className="auth_links">Sign Up</a></span>
          </div>
        </div>
      </div>

      <div className="main_header">
        <div className="logo">
          <img src="/img/Logo-black.png" alt="Logo" />
        </div>
        <div className="search_bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className="search_input" placeholder="Search" />
          <button className="search_button">Search</button>
        </div>
        <div className="user_actions">
          <span className="material-symbols-outlined favorite_icon">favorite</span>
          <span className="divider"></span>
          <div className="cart">
            <span className="material-symbols-outlined cart_icon">shopping_bag</span>
            <span className="cart_badge">2</span>
            <div>
              <div className="cart_text">Shopping cart:</div>
              <div className="cart_value">$57.00</div>
            </div>
          </div>
        </div>
      </div>

      <nav className="nav_bar">
        <div className="hamburger" onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <ul className={`nav_menu ${isMenuOpen ? "active" : ""}`}>
          <li><a href="#" className="nav_link">Home <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav_link">Shop <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav_link">Pages <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav_link">Blog <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="#" className="nav_link">About Us</a></li>
          <li><a href="#" className="nav_link">Contact Us</a></li>
        </ul>
        <div className="phone_number">
          <span className="material-symbols-outlined">phone_in_talk</span>
          <span className="number">(219) 555-0114</span>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="breadcrumb_address">
          <span className="material-symbols-outlined">home</span>
          <span className="material-symbols-outlined">chevron_right</span>
          <span className="page">{getPageTitle()}</span> //levy sửa chút
        </div>
      </div>
    </header>
  );
};

export default Header;
