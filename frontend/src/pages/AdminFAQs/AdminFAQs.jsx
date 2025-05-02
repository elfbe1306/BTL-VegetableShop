import styles from './AdminFAQs.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import AdminQuestion from '../../components/Admin/AdminQuestion/AdminQuestion';

const AdminFAQs= () => {
    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='FaQs' />
        <main className={styles.main}>
            <AdminQuestion/>
		</main>

      </div>
    </div>
        
    );
};
export default AdminFAQs;
