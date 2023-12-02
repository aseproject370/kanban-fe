import React from 'react'
import KanbanBoard from "./KanbanBoard";
import styles from '../home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../../store/uiSlice';

const Board = () => {
  const dispatch = useDispatch();
  dispatch(hide());
  return <>
    <div className={styles.App}>
      <div className={styles.body}>
        <div>
         <KanbanBoard />
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  </>;
  
}

export default Board
