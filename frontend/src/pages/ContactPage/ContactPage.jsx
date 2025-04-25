import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../ContactPage/ContactPage.module.css';
import Location from '../../assets/icons/Location'
import MailContact from '../../assets/icons/MailContact';
import Phone from '../../assets/icons/Phone';

const ContactPage = () => {
     const [contact, setContact] = useState('');
     const handleContactPost = () => {
    }
    return(
        <div>
            <Header />
            <div className={styles.mainbox}>
                <div className={styles.companycontact}>
                    <div className={styles.leftcomponent}>
                        <Location className={styles.infoicon} />
                        <h3>2715 Ash Dr. San Jose, South Dakota 83475</h3>
                    </div>
                    <div className={styles.leftcomponent}>
                        <MailContact className={styles.infoicon} />
                        <h3>Proxy@gmail.com</h3>
                        <h3>Help.proxy@gmail.com</h3>
                    </div>
                    <div className={styles.leftcomponent}>
                        <Phone className={styles.infoicon} />
                        <h3>(219) 555-0114</h3>
                        <h3>(164) 333-0487</h3>
                    </div>
                </div>
                <div className={styles.customercontact}>
                    <h2>Contact Us</h2>
                    <h3>For any inquiries or assistance from us, please leave your info here.</h3>
                    <h3>We will review and respond as soon as possible.</h3>
                    <form style={{display:'flex', flexDirection:'column'}}>
                        <div className={styles.forminfo}>
                            <input className={styles.forminput} placeholder="Your name" type="text" id="name" name="name"/>
                            <input className={styles.forminput} placeholder="Phone number" type="text" id="phonenum" name="phonenum"/>
                        </div>
                        <input className={styles.textarea} style={{height:'auto'}} placeholder="Subject" type="text" id="subject" name="subject"/>
                        <textarea placeholder="Enter your message" value={contact} onChange={(c) => setContact(c.target.value)} className={styles.textarea}/>
                        <button onClick={handleContactPost} className={styles.summitbutton}>Send</button>
                    </form>
                </div>   
            </div>
            <div>
            </div>
            <Footer />
        </div> 
    );
}

export default ContactPage