import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./uiSlice";

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        boards: []
    },
    reducers: {
        replace(state, action) {
            state.boards = action.payload;
        }
    }
});

export const { replace } = boardSlice.actions;
export const getBoards = (token, userId) => {
    console.log(token)
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + userId + '/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the authentication token
                },
            });
            const data = await res.json();
            return Object.values(data);
        }
        try {
            let boards = await fetchHandler();
            dispatch(replace(boards));
        } catch (e) { }
    }
};

export const saveBoard = (board, userId, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + userId + '/projects', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(board)
            })
            const data = await res.json();
            if (data.error) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "error fetching data",
                        type: "error"
                    })
                );
            } else {
                dispatch(getBoards(token, userId));
            }
        }
        sendRequest()
    }
};

export default boardSlice;


