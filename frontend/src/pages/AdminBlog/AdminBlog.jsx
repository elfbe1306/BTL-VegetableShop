import styles from '../AdminBlog/adminblog.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import PostTable from '../../components/Admin/PostTable/PostTable';

const AdminBlog = () => {
  return (
  <div className={styles.BigWrapper}>
    <SideBar/>
    <div className={styles.Wrapper}>
      <Header title='Blog' />
      <main className={styles.main}>
          <PostTable/>
      </main>

    </div>
  </div>
      
  );
};
export default AdminBlog;

