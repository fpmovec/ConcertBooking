import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Header.module.css'

export const Header = () => {
    return (
        <div className={styles.header}>
         <Link to="./" className={styles.title}>
            ConcertBooking
         </Link>
         <div className={styles.inputGroup}>
            <input placeholder='Search concert...'/>
            <button style={{ margin: 5}}>Search</button>
         </div>
         
         <Link to="./signin" className={styles.signIn}>
            Sign In
         </Link>
        </div>
    );
}