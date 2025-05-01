import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import styles from "./AdminAboutEdit.module.css";
import apiService from '../../../api';

const AdminAboutEdit = () => {
    const [information, setInformation] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editing, setEditing] = useState(null);
    const [newQues, setNewQues] = useState("");
    const [newAns, setNewAns] = useState("");
    const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.FetchInfo();
      setInformation(response);
    }
    fetchData();
  }, [])

  const handleView = () => {
    navigate('/about'); 
  };

//   const handleAdd = async () => {
//     try {
//       if (editing) {
//         await apiService.UpdateQuestion(editing.question_id, newQues, newAns);
//       } else {
//         await apiService.CreateQuestion(newQues, newAns);
//       }
//       const updated = await apiService.FetchQuestion();
//       setQuestion(updated);
//       setShowPopup(false);
//       setNewQues('');
//       setNewAns('');
//       setEditing(null);
//     } catch (err) {
//       console.error("Failed to create/update question", err);
//     }
//   };
    

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Information</h2>
        <div className={styles.AddBtn}>Add New</div>

        {/* {showPopup && (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                <h3 style={{color:'black'}}>Add New Question</h3>
                <input
                    type="text"
                    placeholder="Enter question"
                    value={newQues}
                    onChange={(e) => setNewQues(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder="Enter answer"
                    value={newAns}
                    onChange={(e) => setNewAns(e.target.value)}
                    className={styles.textarea}
                />
                <div className={styles.modalButtons}>
                    <button onClick={handleAdd} className={styles.submitBtn}>Submit</button>
                    <button onClick={() => setShowPopup(false)} className={styles.cancelBtn}>Cancel</button>
                </div>
                </div>
            </div>
            )} */}

      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Title", "Description", "Image",""].map((head) => (
                <th key={head} className={styles.th}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {information.map((item) => (
              <motion.tr
                key={item.question_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={styles.td}>
                    <div className={styles.itemTitle}>{item.title}</div>
                </td>

                <td className={styles.td}>
                  <div className={styles.itemDes}>{item.description}</div>
                </td>

                <td className={styles.td}>
                    <div className={styles.itemDes}>{item.img}</div>
                </td>

                <td className={styles.td}>
                    <button className={styles.viewBtn} onClick={handleView} >View</button>
                    <button className={styles.editBtn}>Edit</button>
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

export default AdminAboutEdit;
