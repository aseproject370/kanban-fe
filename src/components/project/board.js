import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './board.module.css'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Board = (props) => {
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);


    const handleDelete = (id) => {

     }


    const handleClick = () => {
        navigate(`${props.id}/features`);
    };

    return (
        <div className={styles.habit}>
            <div className="flex items-center justify-between" onClick={handleClick}>
                <div className="flex-shrink-0 px-10">
                    <h4>{props.name}</h4>
                </div>
            </div>
            <div className="flex-shrink-0 px-10">
                <h6>{props.description}</h6>
            </div>
        </div>
    );

};

export default Board;

