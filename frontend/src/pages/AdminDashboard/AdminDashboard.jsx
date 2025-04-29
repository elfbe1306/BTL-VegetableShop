import { BarChart2, ShoppingBag, Users, Zap, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";
import styles from './AdminDashboard.module.css'

import Header from "../../components/Admin/Header/Header";
import StatCard from "../../components/Admin/StatCard/StatCard";
import SalesOverviewChart from "../../components/Admin/SalesOverviewChart/SalesOverviewChart";
import SideBar from "../../components/Admin/SideBar/SideBar";

const AdminDashboard = () => {
	return (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
			<Header title='Overview' />

        <main className={styles.main}>
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name="Total Sales" icon={Zap} value="$12,345" color="#6366F1" />
            <StatCard name="New Users" icon={Users} value="1,234" color="#8B5CF6" />
            <StatCard name="Total Products" icon={ShoppingBag} value="567" color="#EC4899" />
            <StatCard name="Total Review" icon={ MessageSquareText} value="300" color="#10B981" />
          </motion.div>


          <div>
            <SalesOverviewChart />
          </div>
        </main>
      </div>
    </div>
		
	);
};
export default AdminDashboard;
