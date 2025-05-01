import styles from './Header.module.css'; // dùng CSS Module

const Header = ({ title }) => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<h1 className={styles.headerTitle}>{title}</h1>
			</div>
		</header>
	);
};

export default Header;
