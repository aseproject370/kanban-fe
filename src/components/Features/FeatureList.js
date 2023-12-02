import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFeatures } from '../../store/featureSlice';
import Feature from './Feature';
import AddFeature from './AddFeature';
import { setNotification, toggle } from '../../store/uiSlice';
import Notification from "../layout/Notification";

const FeatureList = () => {

  let { projectId } = useParams();

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const showAddBoardComp = useSelector(state => state.ui.display);


  const hideAddBoardComp = () => {
    dispatch(toggle());
  }
  const toggleAddBoard = () => {
    dispatch(toggle());
  }

  console.log(projectId)


  useEffect(() => {
    dispatch(
      setNotification({
        open: true,
        message: "fetching features ",
        type: "warning"
      })
    );
  
    dispatch(getFeatures(projectId, token));
    dispatch(
      setNotification({
        open: true,
        message: "features fetched!",
        type: "success"
      })
    );

  }, [dispatch]);


  const features = useSelector(state => state.feature.features)
  const notification = useSelector(state => state.ui.notification);

  console.log('HERE', features);
  
  


  return (
    <div className="flex flex-row w-full">
      
      <div className="flex-1 container mx-auto mt-8">

        <div>
          <Button variant="outlined" onClick={toggleAddBoard}> Add Feature</Button>
        </div>
        {notification && <Notification type={notification.type} message={notification.message} />}
        &nbsp;
        <div>
          <ul className="grid grid-cols-1 gap-4">
            {features.map((feature) => (
              <li key={feature.id} className="border p-4 rounded shadow">
                <Feature id={feature.id} name={feature.name} stage={feature.stage} startDate={feature.startDate} endDate={feature.endDate} storyPoints={feature.storyPoints}></Feature>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showAddBoardComp && <AddFeature onClose={hideAddBoardComp} />}
    </div>
  );
};

export default FeatureList;
