import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import styles from "./UsersTable.module.css";
import apiService from '../../../api';

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountData, setaccountData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(accountData);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchAdminAccount();
      setaccountData(response);
      setFilteredUsers(response);
    }
    fetchData();
  }, [])
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = accountData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Users</h2>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search users..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className={styles.searchIcon} size={18} />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Name", "Email", "Actions"].map((head) => (
                <th key={head} className={styles.th}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={styles.td}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {user.name.charAt(0)}
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                  </div>
                </td>

                <td className={styles.td}>
                  <div className={styles.email}>{user.email}</div>
                </td>

                <td className={styles.td}>
                  <button className={styles.deleteBtn}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersTable;
