import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import AdminListProduct from "../../components/Admin/AdminListProduct/AdminListProduct"

import styles from '../../pages/AdminProduct/AdminProduct.module.css'

const AdminProduct = () => {
    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Products' />
        <main className={styles.main}>
            <AdminListProduct></AdminListProduct>
		</main>
      </div>
    </div>
    );
};
export default AdminProduct;
