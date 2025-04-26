import React, { useState, useEffect } from 'react';
import styles from '../../pages/LoginSignup/Login.module.css'
import apiService from '../../api';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign up submitted:', { email, password });
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
                <h1 className={styles.title}>SIGN UP</h1>
                <input
                type="name"
                placeholder="Name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
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
                <button type="submit" className={styles.button}>Sign up</button>
                <Link to="/login" className={styles.loginButton}>
                    Already have an account?
                </Link>
            </form>
        </div>
    )
}
export default SignUp