import React from "react";
import styles from "./OurTeam.module.css";

const OurTeam = () => {
    return (
      <div>
        <div className={styles.ImageBlockWrap}>
            <div className={styles.ImageBlock}>
            <img src="src/assets/images/ImageSample1.png" alt="img" />
                <div  className={styles.overlay}>
                    <div className= {styles.SocialIcons}>
                        <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.twitter}`}><i className="fab fa-twitter"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.pinterest}`}><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className={styles.BlockText}>
                    <div className={styles.HeadText}>Jenny Wilson</div>
                    <div className={styles.SmallText}>Ceo & Founder</div>
                </div>
            </div>
            
            <div className={styles.ImageBlock}>
                <img src="src/assets/images/ImageSample2.png" alt="img" />
                <div  className={styles.overlay}>
                    <div className= {styles.SocialIcons}>
                        <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.twitter}`}><i className="fab fa-twitter"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.pinterest}`}><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className={styles.BlockText}>
                    <div className={styles.HeadText}>Jane Cooper</div>
                    <div className={styles.SmallText}>Worker</div>
                </div>
            </div>

            <div className={styles.ImageBlock}>
                <img src="src/assets/images/ImageSample3.png" alt="img" />
                <div  className={styles.overlay}>
                    <div className= {styles.SocialIcons}>
                        <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.twitter}`}><i className="fab fa-twitter"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.pinterest}`}><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className={styles.BlockText}>
                    <div className={styles.HeadText}>Cody Fisher</div>
                    <div className={styles.SmallText}>Security Guard</div>
                </div>
            </div>

            <div className={styles.ImageBlock}>
            <img src="src/assets/images/ImageSample4.png" alt="img" />
                <div  className={styles.overlay}>
                    <div className= {styles.SocialIcons}>
                        <a href="#" className={`${styles.socialIcon} ${styles.facebook}`}><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.twitter}`}><i className="fab fa-twitter"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.pinterest}`}><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className={`${styles.socialIcon} ${styles.instagram}`}><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className={styles.BlockText}>
                    <div className={styles.HeadText}>Robert Fox</div>
                    <div className={styles.SmallText}>Senior Farmer Manager</div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default OurTeam;