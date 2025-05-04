import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../ContactPage/ContactPage.module.css';
import Location from '../../assets/icons/Location'
import MailContact from '../../assets/icons/MailContact';
import Phone from '../../assets/icons/Phone';
import apiService from '../../api';

const ContactPage = () => {
    const [contact, setContact] = useState({
        phonenum: "",
        subject: "",
        content: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactPost = async (e) => {
        e.preventDefault(); 
        const userID = localStorage.getItem("userID");
        const response = await apiService.CreateContact(userID, {
            phonenum: contact.phonenum,
            subject: contact.subject,
            content: contact.content
        });

        if(response.success) {
            setContact({
                phonenum: "",
                subject: "",
                content: ""
            })
        }
    }

    const [userName, setUserName] = useState("Not found");
    useEffect(() => {
        const FetchData = async () => {
            const userID = localStorage.getItem("userID");
            if(!userID) return;

            const response = await apiService.FetchUserName(userID);
            setUserName(response.username)
        }

        FetchData();
    }, [])

    return(
        <>
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
                    <form style={{display:'flex', flexDirection:'column'}} onSubmit={handleContactPost}>
                        <div className={styles.forminfo}>
                            <input 
                                className={styles.forminput} 
                                placeholder={userName}
                                type="text"
                                value={userName}
                                readOnly
                            />
                            <input 
                                className={styles.forminput} 
                                placeholder="Phone number" 
                                type="text" 
                                name="phonenum"
                                value={contact.phonenum}
                                onChange={handleChange}
                            />
                        </div>
                        <input 
                            className={styles.textarea} 
                            style={{height:'auto'}} 
                            placeholder="Subject" 
                            type="text" 
                            name="subject"
                            value={contact.subject}
                            onChange={handleChange}                    
                        />
                        <textarea 
                            placeholder="Enter your message" 
                            name="content"
                            value={contact.content}
                            onChange={handleChange}
                            className={styles.textarea}
                        />
                        <button type='submit' className={styles.summitbutton}>Send</button>
                    </form>
                </div>   
            </div>
            <Footer />
        </> 
    );
}

export default ContactPage
