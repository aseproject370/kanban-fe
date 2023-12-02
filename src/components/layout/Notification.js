import React from 'react'
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../store/uiSlice';

const Notification = (props) => {
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    const open = notification.open;

    const handleClose = () => {
        dispatch(setNotification({ open: false }));
    }

    return (
        <div>
            {open && <Alert severity={props.type} onClose={handleClose}>{props.message}</Alert>}
        </div>
    );
}

export default Notification;
