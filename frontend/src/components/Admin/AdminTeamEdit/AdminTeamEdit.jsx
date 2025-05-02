import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import styles from "./AdminTeamEdit.module.css";
import apiService from '../../../api';

const AdminTeamEdit = () => {
    const [team, setTeam] = useState([]);
    const [formData, setFormData] = useState({ name: "", role: "", img: null });
    const [showPopup, setShowPopup] = useState(false);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();
  
    const fetchTeam = async () => {
        const response = await apiService.FetchTeam();
        setTeam(response);
      };
      
      useEffect(() => {
        fetchTeam();
      }, []);
      

  const handleView = () => {
    navigate('/about'); 
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData({ name: item.name, role: item.role, img: null });
    setShowPopup(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({ name: "", role: "", img: null });
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await apiService.UpdateTeam(editing.team_id, formData.name, formData.role, formData.img);
      } else {
        await apiService.AddTeam(formData.name, formData.role, formData.img);
      }
  
      await fetchTeam();
      setShowPopup(false);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save. Please check console for errors.");
    }
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
        <div className={styles.AddBtn} onClick={handleAdd}>Add New</div>
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
                    <button className={styles.viewBtn} onClick={handleView}>View</button>
                    <button className={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                    {showPopup && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                            <h3>{editing ? "Edit Member" : "Add New Member"}</h3>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                    
                            <label>Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
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
                    )}
                    
                    <button className={styles.deleteBtn}
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to delete this teammate information?")) {
                                await apiService.DeleteTeam(item.team_id);
                                setTeam(await apiService.FetchTeam());
                                }
                            }}
                            >Delete</button>
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
