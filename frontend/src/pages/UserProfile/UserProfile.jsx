import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from '../../pages/UserProfile/UserProfile.module.css'
import apiService from '../../api';

const UserProfile = () => {
    const [user, setUser] = useState({ name: '', email: '' })
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        // Replace this with real API/user context
        const storedUser = JSON.parse(localStorage.getItem('user')) || {
        name: 'John Doe',
        email: 'john@example.com'
        }
        setUser(storedUser)
    }, [])

    const handlePasswordChange = (e) => {
        e.preventDefault()
        if (newPassword.trim().length < 6) {
        alert('Password must be at least 6 characters.')
        return
        }

        // Send password to backend here
        alert('Password updated!')
        setNewPassword('')
        setShowPasswordForm(false)
    }
    return (
        <>
            <Header />
            <div className={styles.mainbox}>
                <h1>Member Profile</h1>
                <div className={styles.infobox}>
                    <div className={styles.info}>
                        <div className={styles.avatar}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
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