import React , {useState, useEffect} from "react";
import "../Header/header.css";
import { useLocation, useParams, Link } from 'react-router-dom'; //levy add

import { useCart } from "../../CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { productName } = useParams();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatProductName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  //levy làm
  
  const location = useLocation();
  // const getPageTitle = () => {
  //   switch (location.pathname) {
  //     case '/blog':
  //       return 'Blog';
  //     case '/vegetable':
  //       return 'Vegetable';
  //     case '/contact':
  //       return 'Contact';
  //     case '/about':
  //       return 'About';
  //     case '/faqs':
  //       return 'Faqs';
  //     case '/shoppingcart':
  //       return 'Shopping cart';
  //     default:
  //       return 'Home';
  //   }
  // };
  const getPageTitle = () => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathnames[pathnames.length - 1] || '';

    if (location.pathname.startsWith('/vegetable/') && productName) {
      return 'Vegetable/' + `${formatProductName(productName)}`;
    }

    switch (lastSegment) {
      case 'blog':
        return 'Blog';
      case 'vegetable':
        return 'Vegetable';
      case 'cart':
        return 'Shopping Cart';
      case 'contact':
        return 'Contact';
      case 'about':
        return 'About';
      case 'faqs':
        return 'Faqs';
      case 'shoppingcart':
        return 'Shopping cart';
      case 'singlepost':
        return 'Single Blog';
      default:
        // If lastSegment is a number (like blog post ID), treat it as Single Blog
        if (!isNaN(lastSegment)) {
          return 'Single Blog';
        }
        // Capitalize first letter
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) || 'Home';
    }
  };
  

  const [productCount, setProductCount] = useState(0);
  const [productPrice, setProductPrice] = useState(0);

  const { cartItems } = useCart();

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setProductCount(total);

    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.price;
      const discount = item.product.discount_percentage 
        ? price * (1 - Number(item.product.discount_percentage) / 100)
        : price;
      return sum + discount * item.quantity;
    }, 0);
    setProductPrice(Math.round(totalPrice * 100) / 100);

  }, [cartItems]);

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
          <Link to={`/`}>
            <img src="/img/Logo-black.png" alt="Logo" />
          </Link>
        </div>
        <div className="search_bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className="search_input" placeholder="Search" />
          <button className="search_button">Search</button>
        </div>
        <div className="user_actions">
          <span className="material-symbols-outlined favorite_icon">favorite</span>
          <span className="divider"></span>
            <Link className="cart" to={'/cart'}>
              <span className="material-symbols-outlined cart-icon">shopping_bag</span>
              <span className="cart-badge">{productCount}</span>
              <div>
                <div className="cart-text">Shopping cart:</div>
                <div className="cart-value">${productPrice}</div>
              </div>
            </Link>
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
        <div className="breadcrumb-address">
            <span className="material-symbols-outlined">home</span>
            <span className="material-symbols-outlined">chevron_right</span>
            {location.pathname.startsWith('/vegetable/') && productName ? (
                <>
                  <a href="/vegetable" className="breadcrumb-link">Vegetable</a>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <span className="page">{formatProductName(productName)}</span>
                </>
              ) : (
                <span className="page">{getPageTitle()}</span>
              )}
        </div>
      </div>
    </header>
  );
};

export default Header;
