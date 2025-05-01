import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import styles from "./AdminTeamEdit.module.css";
import apiService from '../../../api';

const AdminTeamEdit = () => {
    const [team, setTeam] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", img: null });
    const [showPopup, setShowPopup] = useState(false);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchTeam();
      setTeam(response);
    }
    fetchData();
  }, [])

  const handleView = () => {
    navigate('/about'); 
  };


  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.AddBtn} onClick={handleView}>View</div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Name","Role", "Image",""].map((head) => (
                <th key={head} className={styles.th}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((item) => (
              <motion.tr
                key={item.team_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={styles.td}>
                    <div className={styles.itemTitle}>{item.name}</div>
                </td>

                <td className={styles.td}>
                  <div className={styles.itemDes}>{item.role}</div>
                </td>

                <td className={styles.td}>
                    <div className={styles.itemDes}>{item.img}</div>
                </td>

                <td className={styles.td}>
                    <button className={styles.editBtn}>Edit</button>
{/* 
                    {showPopup && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                            <h3>Edit Information</h3>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />

                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                rows={5}
                                onChange={handleChange}
                            />

                            <label>Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            <div className={styles.popupButtons}>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={() => setShowPopup(false)}>Cancel</button>
                            </div>
                            </div>
                        </div>
                        )} */}


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

export default AdminTeamEdit;
