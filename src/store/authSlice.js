import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./uiSlice";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        id:null
    },
    reducers: {
        login(state, {payload}) {
            state.isLoggedIn = true;
            state.token = payload.token;
            state.id = payload.id;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.id = null;
            
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice;

export const authenticate = (credentials) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })
           
            if (res.status!=200) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "login failed! please try again",
                        type: "error"
                    })
                );
            } else {
                const data = await res.json();
                dispatch(login(data));
            }
        }
        sendRequest()
    }
};

export const register = (user) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })

            if (res.status != 200) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "signup failed! please try again",
                        type: "error"
                    })
                );
            } else {
                const data = await res.json();
                dispatch(
                    setNotification({
                        open: true,
                        message: "Registraion success! please Login",
                        type: "success"
                    })
                );
            }
        }
        sendRequest()
    }
};