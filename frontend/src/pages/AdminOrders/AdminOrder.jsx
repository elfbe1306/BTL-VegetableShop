import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import Header from "../../components/Admin/Header/Header";
import SideBar from '../../components/Admin/SideBar/SideBar';
import ListProductModal from "../../components/Admin/ListProductModal/ListProductModal";

import styles from './AdminOrder.module.css';
import apiService from "../../api";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const FetchCustomerOrders = async () => {
    const response = await apiService.FetchCustomerOrders();
    setOrders(response.orders);
  }

  useEffect(() => {
    FetchCustomerOrders();
  }, [])

  const FilterOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const [isListProductOpen, setIsListProductOpen] = useState(false);
  const handleOpenListProduct = (order) => {
    setSelectedOrder(order);
    setIsListProductOpen(true);
  };
  const handleCloseListProduct = () => setIsListProductOpen(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return  (
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Orders' />
        <main className={styles.main}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          > 
            <div className={styles.SearchBigContainer}>
              <div className={styles.SearchContainer}>
                <Search className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  placeholder="Search customer name..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                    {["Customer", "Phone", "Address", "State", "Zipcode", "Order Summary", "Status", "Action"].map((head) => (
                    <th key={head} className={styles.th}>
                      {head}
                    </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {FilterOrders.map((order) => {
                  return(
                    <motion.tr
                      key={order.order_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    > 
                      <td className={styles.td}>{order.name}</td>
                      <td className={styles.td}>{order.phone}</td>
                      <td className={styles.td}>{order.address}</td>
                      <td className={styles.td}>{order.state}</td>
                      <td className={styles.td}>{order.zip_code}</td>
                      <td className={styles.td}>
                        <button className={styles.viewButton} onClick={() => handleOpenListProduct(order)}>View</button>
                      </td>
                      <td className={styles.td}>{order.status}</td>
                      <td></td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
        </main>

        {isListProductOpen && (
          <ListProductModal onClose={handleCloseListProduct} ListProduct={selectedOrder}/>
        )}
      </div>
    </div>
  )

} 

export default AdminOrder;