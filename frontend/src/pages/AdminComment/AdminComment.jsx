import styles from '../AdminBlog/adminblog.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import CommentsTable from '../../components/Admin/CommentTable/CommentTable';

const AdminComment = () => {
  return (
  <div className={styles.BigWrapper}>
    <SideBar/>
    <div className={styles.Wrapper}>
      <Header title='Comments' />
      <main className={styles.main}>
          <CommentsTable/>
      </main>

    </div>
  </div>
      
  );
};
export default AdminComment;

