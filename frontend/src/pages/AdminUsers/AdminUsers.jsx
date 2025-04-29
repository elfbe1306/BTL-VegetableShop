import styles from './AdminUsers.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import UsersTable  from '../../components/Admin/UserTable/UsersTable';

const AdminUsers = () => {
    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Users' />
        <main className={styles.main}>

			<UsersTable />
		</main>

      </div>
    </div>
        
    );
};
export default AdminUsers;
