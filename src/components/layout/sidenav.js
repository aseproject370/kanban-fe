import React from "react";
import styles from './sidenav.module.css';
import { NavLink } from "react-router-dom";

const SideNav = () => {
    return (
        <div className={styles.layout}>
            <NavLink to="/home" className={styles.navlink}>Projects</NavLink>
            <NavLink to='/home/analytics' className={styles.navlink}>Analytics</NavLink>
            {/* <NavLink to='/home/notes' className={styles.navlink}>Notes</NavLink> */}
        </div>
    );
}

export default SideNav;