import { ShoppingBag, Users, Zap, MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";
import styles from './AdminDashboard.module.css'

import Header from "../../components/Admin/Header/Header";
import StatCard from "../../components/Admin/StatCard/StatCard";
import SalesOverviewChart from "../../components/Admin/SalesOverviewChart/SalesOverviewChart";
import SideBar from "../../components/Admin/SideBar/SideBar";
import { useEffect, useState } from "react";
import apiService from "../../api";

const AdminDashboard = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalReview, setTotalReview] = useState(0);

  useEffect(() => {
    const FetchData = async () => {
      const response1 = await apiService.CountTotalProduct();
      setTotalProduct(response1);

      const response2 = await apiService.CountTotalUser();
      setTotalUser(response2);

      const response3 = await apiService.CountTotalReview();
      setTotalReview(response3);
    }

    FetchData();
  }, [])

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
            <StatCard name="New Users" icon={Users} value={totalUser} color="#8B5CF6" />
            <StatCard name="Total Products" icon={ShoppingBag} value={totalProduct} color="#EC4899" />
            <StatCard name="Total Reviews" icon={ MessageSquareText} value={totalReview} color="#10B981" />
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
