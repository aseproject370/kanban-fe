import React from 'react'
import Modal from "../UI/Modal";
import { useState } from "react";
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { saveFeature, } from '../../store/featureSlice';



const AddFeature = (props) => {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(dayjs(new Date().toISOString()));
  const [endDate, setEndDate] = useState(dayjs(new Date().toISOString()));

  const [isNameValid, setIsNameValid] = useState(true);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  let { projectId } = useParams();



  const nameInputChangeHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  }

  const startDateChangeHandler = (event) => {
    console.log()
    setStartDate(new Date(event.$d).toISOString());
    setIsNameValid(true);
  }
  const endDateChangeHandler = (event) => {
    setEndDate(new Date(event.$d).toISOString());
    setIsNameValid(true);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      setIsNameValid(false);
      return;
    }

    dispatch(saveFeature({
      name,
      startDate,
      endDate,
      projectId,
      featureStageId: 1,
      storyPoints:0
    },token))
   
    setIsNameValid(true);
    
    props.onClose();
  }

  return (
    <Modal onClose={props.onClose}>
      <div>
        <h4>
          Enter Feature Details :
        </h4>
        <form onSubmit={handleFormSubmit}>
          <div>
            <TextField id="standard-basic" label="Name: " variant="standard" onChange={nameInputChangeHandler} />
            {!isNameValid && <Alert severity="error">"Name cannot be empty</Alert>}

            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Target start" value={startDate}
                  onChange={(newValue) => startDateChangeHandler(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Target End" value={endDate}
                  onChange={(newValue) => endDateChangeHandler(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <br></br>
          <Button variant="contained" type="submit">ADD</Button>
        </form>
      </div>

    </Modal>
  )
}

export default AddFeature
