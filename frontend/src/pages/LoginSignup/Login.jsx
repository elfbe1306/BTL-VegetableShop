import React, { useState, useEffect } from 'react';
import styles from '../../pages/LoginSignup/Login.module.css'
import apiService from '../../api';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', { email, password });
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