import React from "react";
import styles from './HomePageHeader.module.css'
import storeLocationIcon from '../../assets/icons/location_on.svg'
import downArrow from '../../assets/icons/arrow-down-s-line.svg'

const HomePageHeader = () => {

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
		</div>
	)
}

export default HomePageHeader;