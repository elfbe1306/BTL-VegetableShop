import React , {useState, useEffect} from "react";
import "../Header/header.css";
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'; //levy add

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
  
  const location = useLocation();

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
      case 'singlepost':
        return 'Single Blog';
      default:
        if (!isNaN(lastSegment)) {
          return 'Single Blog';
        }
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

  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem('userID'));

	const handleLogout = async (e) => {
		e.preventDefault();

		await localStorage.removeItem("userID");
		setUserID(null);
		navigate('/');
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
          <div className="LoginSignInContainer">
            {userID ? (
              <button onClick={handleLogout}>
                <p>Logout</p>
              </button>
            ) : (
              <Link className="LoginSignInContainer" to={'/login'}>
                <p>Sign in /</p>
                <p>Sign up</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="logo">
          <Link to={`/`}>
            <img src="/img/Logo-black.png" alt="Logo" />
          </Link>
        </div>
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className="search-input" placeholder="Search" />
          <button className="search-button">Search</button>
        </div>
        <div className="user-actions">
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

      <nav className="nav-bar">
        <div className="hamburger" onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/vegetable" className="nav-link">Shop</a></li>
          <li><a href="/faqs" className="nav-link">FaQs</a></li>
          <li><a href="/blog" className="nav-link">Blog <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
          <li><a href="/about" className="nav-link">About Us</a></li>
          <li><a href="/contact" className="nav-link">Contact Us</a></li>
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
            {location.pathname === '/checkout' ? (
              <>
                <Link to="/cart" className="breadcrumb-link">Shopping Cart</Link>
                <span className="material-symbols-outlined">chevron_right</span>
                <span className="page">Check Out</span>
              </>
            ) : location.pathname.startsWith('/vegetable/') && productName ? (
              <>
                <Link to="/vegetable" className="breadcrumb-link">Vegetable</Link>
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
