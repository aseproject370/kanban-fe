import React from "react";
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { toggle } from '../../store/toggleSlice';
import { useDispatch } from "react-redux";
import { logout } from '../../store/authSlice';
import { setNotification } from "../../store/uiSlice";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToProfile = () => {
        navigate("/home/profile")
    };
    const logOut = () => {
        dispatch(logout());
        dispatch(
            setNotification({
                open: true,
                message: "you are logged out!",
                type: "error"
            })
        );
        navigate("/");
    };
    const toogleSideNav = () => {
        dispatch(toggle());
    };

    return (
        <div className={styles.layout}>
            <FontAwesomeIcon icon={faBars} onClick={toogleSideNav} />
            <h4>Kanban Board</h4>
            <div className={styles.profileArea}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} onClick={navigateToProfile} />
                <FontAwesomeIcon icon={faSignOut} className={styles.icon} onClick={logOut} />
            </div>
        </div>
    );
};

export default Header;