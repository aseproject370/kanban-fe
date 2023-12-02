import React, { useState } from "react";
import styles from './addBoard.module.css';
import Modal from "../UI/Modal";
import { Alert } from '@mui/material';
import { saveBoard,  } from '../../store/boardSlice';
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from '@mui/material'


const AddBoard = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [isNameValid, setIsNameValid] = useState(true);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.id);
    const dispatch = useDispatch();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (name.trim() === '') {
            setIsNameValid(false);
            return;
        }

        setIsNameValid(true);
        dispatch(saveBoard({
            name,
            description
        },userId,token));
        props.onClose();
    }
    const nameInputChangeHandler = (event) => {
        event.preventDefault();
        setName(event.target.value);
        setIsNameValid(true);
    }

    const descInputChangeHandler = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    }
    return (
        <Modal onClose={props.onClose}>
            <div><h4>
                Enter Project Details :
            </h4> </div>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.input}>
                    <TextField id="standard-basic" label="Enter Name" variant="standard" onChange={nameInputChangeHandler} />
                    {!isNameValid && <Alert severity="error">"Name cannot be empty</Alert>}
                    <br></br>
                    <TextField id="standard-basic" label="Enter Description" variant="standard" onChange={descInputChangeHandler} />
                    <br></br>
                </div>
                <Button variant="contained" type="submit">ADD</Button>
            </form>
        </Modal>
    );
};
export default AddBoard;
