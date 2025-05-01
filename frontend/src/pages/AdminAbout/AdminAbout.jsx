import styles from './AdminAbout.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import AdminAboutEdit from '../../components/Admin/AdminAboutEdit/AdminAboutEdit';

const AdminAbout= () => {
    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='About Page' />
        <main className={styles.main}>
            <AdminAboutEdit/>
		</main>

      </div>
    </div>
        
    );
};
export default AdminAbout;
