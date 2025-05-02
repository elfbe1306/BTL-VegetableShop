import React, { useEffect, useState } from 'react'
import styles from "./OurTeam.module.css";
import apiService from '../../api';

const OurTeam = () => {
    const [teams, setTeams] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => { 
        const response1 = await apiService.FetchTeam();
        setTeams(response1);
      }
  
      fetchData();
    }, [])

  return (
    <div>
      <div className={styles.ImageBlockWrap}>
        {teams.map((member, index) => (
          <div key={index} className={styles.ImageBlock}>
            <img src={`http://localhost/BTL-VegetableShop/backend/uploads/${member.img}`} alt={member.name} />
            <div className={styles.overlay}>
              <div className={styles.SocialIcons}>
                <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}><i className="fab fa-facebook-f"></i></a>
                <a href="#" className={`${styles.socialIcon} ${styles.twitter}`}><i className="fab fa-twitter"></i></a>
                <a href="#" className={`${styles.socialIcon} ${styles.pinterest}`}><i className="fab fa-pinterest-p"></i></a>
                <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className={styles.BlockText}>
              <div className={styles.HeadText}>{member.name}</div>
              <div className={styles.SmallText}>{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default OurTeam;