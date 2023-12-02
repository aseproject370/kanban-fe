import { useState } from "react";
import styles from './register.module.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Notification from "../layout/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../store/uiSlice";
import { register } from "../../store/authSlice";

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notification = useSelector(state => state.ui.notification);

    const handleSubmit = (event) => {

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
        } else if (email == '') {
            dispatch(
                setNotification({
                    open: true,
                    message: "email cannot be empty",
                    type: "error"
                })
            );
            return
        }
        
        event.preventDefault();
        const user = {
            username,
            password,
            email,
            role:'USER'
        }
        dispatch(register(user))
    }

    const naviagteToLogin = () => {
        navigate("/");
    }

    return (
        <div className={styles.body}>
            <div>
                {notification && <Notification type={notification.type} message={notification.message} />}
            </div>
            <div className={styles.auth_form_container}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit} className={styles.register_form}>
                    <label htmlFor="username">username</label>
                    <input type="text" placeholder="enter your username" id="username" name="username" onChange={(e) => setUsername(e.target.value)} ></input>
                    <label htmlFor="email">email</label>
                    <input type="email" placeholder="enter your email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} ></input>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder="enter your password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <br></br>
                    <Button variant="contained" onClick={handleSubmit}>Register</Button>
                </form>
                <button onClick={() => { naviagteToLogin()}} className={styles.link_btn}>Already have an account ? Login here</button>

            </div>
        </div>
    );
}

export default Register;