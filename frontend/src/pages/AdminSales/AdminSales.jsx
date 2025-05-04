import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./AdminSales.module.css";

import Header from "../../components/Admin/Header/Header";
import SideBar from '../../components/Admin/SideBar/SideBar';
import apiService from "../../api";

import ListSaleProductModal from "../../components/Admin/ListSaleProductModal/ListSaleProductModal";

const AdminSales = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const FetchSaleData = async () => {
    const response = await apiService.FetchSalePromotions();
    setSales(response.sales);
    console.log(response);
  }

  useEffect(() => {
    FetchSaleData();
  }, []);

  const FilteredSales = sales.filter((sale) =>
    sale.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const [isListProductModalOpen, setIsListProductModalOpen] = useState(false);
  const [selectedSaleProductList, setSelectedSaleProductList] = useState(null);
  const [selectDiscount, setSelectDiscount] = useState(0);
  const handleOpenListProductModal = (ListProduct, Discount) => {
    setSelectedSaleProductList(ListProduct);
    setSelectDiscount(Discount);
    setIsListProductModalOpen(true);
  }
  const handleCloseListProductModal = () => setIsListProductModalOpen(false);

  return(
    <div className={styles.BigWrapper}>
      <SideBar/>
      <div className={styles.Wrapper}>
        <Header title='Sales' />
        <main className={styles.main}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.SearchAndAddContainer}>
              <button className={styles.NewSaleButton}>Add New Sale</button>
              <div className={styles.SearchContainer}>
                <Search className={styles.searchIcon} size={18} />
                <input
                    type="text"
                    placeholder="Search sale name..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                    {["Name", "Discount Percentage", "Description", "Created At", "List Products", "Action"].map((head) => (
                    <th key={head} className={styles.th}>
                      {head}
                    </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {FilteredSales.map((sale) => {
                  return(
                    <motion.tr
                      key={sale.sale_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    > 
                      <td className={styles.td}>{sale.name}</td>
                      <td className={styles.td}>{sale.discount_percentage}</td>
                      <td className={styles.td}>{sale.description}</td>
                      <td className={styles.td}>{sale.createdAt}</td>
                      <td>
                        <button className={styles.viewButton} onClick={() => handleOpenListProductModal(sale.list_product, sale.discount_percentage)}>
                          View
                        </button>
                      </td>
                      <td>
                        <button className={styles.editButton} >Edit</button>
                        <button className={styles.deleButton} >Delete</button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
        </main>

        {isListProductModalOpen && (
          <ListSaleProductModal onClose={handleCloseListProductModal} ListProduct={selectedSaleProductList} Discount_Percentage={selectDiscount}/>
        )}
      </div>
    </div>
  )
}

export default AdminSales;