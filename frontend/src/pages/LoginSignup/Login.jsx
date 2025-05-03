import React, { useState, useEffect } from 'react';
import styles from '../../pages/LoginSignup/Login.module.css'
import apiService from '../../api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response1 = await apiService.Login({email: email, password: password});
        
        const response2 = await apiService.CheckRole(response1.userID);

        if(response1.permission) {
            localStorage.setItem("userID", response1.userID);
            if(response2.role === "Admin") {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }

        if(!response1.permission) {
            alert(response1.message);
        }
    };

    return(
        <div>
            <video 
                className={styles.video}  
                autoPlay 
                loop 
                muted 
                playsInline 
                src="/LoginVideo.mp4">
            </video>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>LOGIN</h1>
                <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" className={styles.button}>Login</button>
                <h4>Forget password?</h4>
                <div className={styles.divider}>
                    <span>or</span>
                </div>
                <Link to="/signup" className={styles.signupButton}>
                    Sign Up
                </Link>
            </form>
        </div>
    )
}
export default Login