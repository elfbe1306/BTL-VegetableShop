import React, { useState } from "react";
import styles from './HomePageHeader.module.css'
import storeLocationIcon from '../../assets/icons/location_on.svg'
import downArrow from '../../assets/icons/arrow-down-s-line.svg'

const HomePageHeader = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
	setIsMenuOpen(!isMenuOpen);
	  };

	return(
		<div>
			<div className={styles.topBar}>
				<p className={styles.storeLocation}>
					<img src={storeLocationIcon}/>
					Store Location: Lincoln- 344, Illinois, Chicago, USA
				</p>
				<div className={styles.selector}>
					<div className={styles.languageSelector}>
						<p>ENG</p>
						<img src={downArrow}/>
					</div>
					<div className={styles.currencySelector}>
						<p>USD</p>
						<img src={downArrow}/>
					</div>
				</div>
			</div>

			<div className={styles.mainHeader}>
				<div className={styles.logo}>
					<img src="/img/Logo-black.png" alt="Logo" />
				</div>

				<div className={styles.searchBar}>
					<i className="fa-solid fa-magnifying-glass"></i>
					<input type="text" className={styles.searchInput} placeholder="Search" />
					<button className={styles.searchButton}>Search</button>
				</div>
				<div className={styles.userActions}>
					<span className="material-symbols-outlined favorite-icon">favorite</span>
					<span className={styles.divider}></span>
					<div className={styles.cart}>
						<span className="material-symbols-outlined cart-icon">shopping_bag</span>
						<span className={styles.cartBadge}>2</span>
						<div>
							<div className={styles.cartText}>Shopping cart:</div>
							<div className={styles.cartValue}>$57.00</div>
						</div>
					</div>
				</div>
			</div>

			<nav className={styles.navBar}>
				<div className={styles.hamburger} onClick={toggleMenu}>
					<span className="material-symbols-outlined">menu</span>
				</div>
				<ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
					<li><a href="#" className={styles.navLink}>Home <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
					<li><a href="#" className={styles.navLink}>Shop <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
					<li><a href="#" className={styles.navLink}>Pages <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
					<li><a href="#" className={styles.navLink}>Blog <i className="fa-solid fa-chevron-down fa-sm"></i></a></li>
					<li><a href="#" className={styles.navLink}>About Us</a></li>
					<li><a href="#" className={styles.navLink}>Contact Us</a></li>
				</ul>
				<div className={styles.phoneNumber}>
					<span className="material-symbols-outlined">phone_in_talk</span>
					<span className="number">(219) 555-0114</span>
				</div>
			</nav>
		</div>
	)
}

export default HomePageHeader;