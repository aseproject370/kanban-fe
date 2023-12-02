import { useState } from "react";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login,authenticate } from '../../store/authSlice';
import Notification from "../layout/Notification";
import { setNotification } from "../../store/uiSlice";

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const notification = useSelector(state => state.ui.notification);

    const handleSubmit = (event) => {
        event.preventDefault();


        if (username == '') {
            dispatch(
                setNotification({
                    open: true,
                    message: "username cannot be empty",
                    type: "error"
                })
            );
            return
        } else if (password == '') {
            dispatch(
                setNotification({
                    open: true,
                    message: "password cannot be empty",
                    type: "error"
                })
            );
            return
        } 
        dispatch(authenticate({ username, password }));
        if (isLoggedIn) {
            navigate("/home");
        }
    }

    const naviagteToRegister = () => {
        navigate("/register");
    }

    return (
        <div className={styles.body}>
            <div>
                {notification && <Notification type={notification.type} message={notification.message} />}

            </div>
            <div className={styles.auth_form_container}>
                <h2>Login</h2>

                <form onSubmit={handleSubmit} className={styles.login_form}>
                    <label htmlFor="username">username</label>
                    <input type="text" placeholder="enter your username" id="username" name="username" onChange={(e) => setUsername(e.target.value)} ></input>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder="enter your password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <br></br>
                    <Button variant="contained" type="submit">Login</Button>
                </form>
                <button onClick={() => { naviagteToRegister() }} className={styles.link_btn}>Don't have an account? Register here.</button>
            </div>
        </div>

    );

}

export default Login;