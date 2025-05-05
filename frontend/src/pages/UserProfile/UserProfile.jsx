import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from '../../pages/UserProfile/UserProfile.module.css'
import apiService from '../../api';

const UserProfile = () => {
    const [accountData, setaccountData] = useState([]);
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userID = localStorage.getItem("userID")
            const response = await apiService.getUserInfo(userID);
            setaccountData(response);
          } catch (error) {
            console.error('Failed to fetch account data:', error);
          }
        };
        fetchData();
      }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (newPassword.trim().length < 6) {
        alert('Password must be at least 6 characters.')
        return
        }

        const userID = localStorage.getItem("userID");
        const response = await apiService.ChangePassword(userID, newPassword);

        if(response.success) {
            alert('Password updated!')
            setNewPassword('')
            setShowPasswordForm(false)
        }
    }
    return (
        <>
            <Header />
            <div className={styles.mainbox}>
                <h1>Member Profile</h1>
                <div className={styles.infobox}>
                    <div className={styles.info}>
                        <div className={styles.avatar}>
                            {accountData.name?.charAt(0)}
                        </div>
                        <div>
                            <p><strong>Name: </strong>{accountData.name}</p>
                            <p><strong>Email: </strong>{accountData.email}</p>
                        </div>
                    </div>
                
                    {!showPasswordForm ? (
                        <button onClick={() => setShowPasswordForm(true)}>Change Password</button>
                    ) : (
                        <form onSubmit={handlePasswordChange}>
                        <label>
                            <div className={styles.passwordupdate}>
                                <span><strong>New Password:</strong></span>
                                <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                />
                            </div>
                        </label>
                        <div className={styles.newpassword}>
                            <button type="submit">Update Password</button>
                            <button type="button" onClick={() => setShowPasswordForm(false)}>Cancel</button>
                        </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default UserProfile