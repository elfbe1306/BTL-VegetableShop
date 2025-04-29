import styles from './AdminAccount.module.css'

import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/SideBar/SideBar";
import UsersTable  from '../../components/Admin/UserTable/UsersTable';
import TeamTable from '../../components/Admin/TeamTable/TeamTable';

const AdminUsers = () => {
    return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Account' />
        <main className={styles.main}>

			<UsersTable />
      <TeamTable/>
		</main>

      </div>
    </div>
        
    );
};
export default AdminUsers;
