import React, { useState, useEffect } from 'react';
import styles from '../../pages/AdminContact/AdminContact.module.css'
import Header from "../../components/Admin/Header/Header";
import SideBar from '../../components/Admin/SideBar/SideBar';
import apiService from '../../api';
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AdminContact = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [accountData, setaccountData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await apiService.FetchContact();
        console.log(response)
        setaccountData(response.data);
        }
        fetchData();
    }, [])

    const filteredUsers = accountData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className={styles.BigWrapper}>
                <SideBar/>
                <div className={styles.Wrapper}>
                        <Header title='Contact Us' />

                    <main className={styles.main}>
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className={styles.searchIcon} size={18} />
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                {["Name", "Phone Number", "Subject", "Message"].map((head) => (
                                <th key={head} className={styles.th}>
                                    {head}
                                </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                >
                                <td className={styles.td}>{user.name}</td>
                                <td className={styles.td}>{user.phonenum}</td>
                                <td className={styles.td}>{user.subject}</td>
                                <td className={styles.td}>{user.content}</td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </motion.div>
                    
                    </main>
                </div>
                </div>
        </>
    )
}

export default AdminContact