import React from "react";
import Board from "./board";
import Accordion from 'react-bootstrap/Accordion';
import styles from './boardsList.module.css';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "../layout/Notification";
import { setNotification,toggle } from '../../store/uiSlice';
import { getBoards } from '../../store/boardSlice';
import AddBoard from './addBoard';
import { Button } from "@mui/material";


const BoardsList = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.id);
    const showAddBoardComp = useSelector(state => state.ui.display);

    const hideAddBoardComp = () => {
        dispatch(toggle());
    }
    const toggleAddBoard = () => {
        dispatch(toggle());
    }
    useEffect(() => {
        dispatch(
            setNotification({
                open: true,
                message: "fetching Projects ",
                type: "warning"
            })
        );
        dispatch(getBoards(token, userId));
        dispatch(
            setNotification({
                open: true,
                message: "Projects fetched!",
                type: "success"
            })
        );
    }, [dispatch]);

    const boards = useSelector(state => state.board.boards);
    const notification = useSelector(state => state.ui.notification);

    return (
        <div className={styles.body}>
            <div className={styles.banner}>
                &nbsp;
                <Button variant="outlined" onClick={toggleAddBoard}> Add Project</Button>
            </div>
            {notification && <Notification type={notification.type} message={notification.message} />}
            <Accordion>
                {
                    boards.map((board) => {
                        return (
                            <Board key={board.id} id={board.id} name={board.name} description={board.description}></Board>
                        );
                    })
                }
            </Accordion>
            {showAddBoardComp && <AddBoard onClose={hideAddBoardComp} />}
           
        </div>

    );
}

export default BoardsList;