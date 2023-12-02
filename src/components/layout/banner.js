import React from "react";
import styles from './banner.module.css';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggle } from '../../store/uiSlice';

const Banner = () => {

    const dispatch = useDispatch();
    const toggleAddBoard = () => {
        dispatch(toggle());
    }
    return (
        <div className={styles.banner}>
            <Button variant="outlined" onClick={toggleAddBoard}>+</Button>
        </div>
    )
}

export default Banner;