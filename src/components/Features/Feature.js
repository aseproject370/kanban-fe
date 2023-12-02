import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { updateFeatureStage,updateStoryPoints,removeFeature } from "../../store/featureSlice";
import { useDispatch, useSelector } from "react-redux";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Feature = ({ id, name, startDate, endDate, stage, storyPoints }) => {


  let { projectId } = useParams();
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/home/board?pid=${projectId}&fid=${id}`);
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateFeatureStage(id, projectId, newStatus, token));

  };

  const handlePointsChange = (id, newPoints) => {
    dispatch(updateStoryPoints(id, projectId, newPoints, token));
  };

  const handleDelete = () => {
    dispatch(removeFeature(id,projectId,token))
  }

  return (
    <div>
      <div className="mb-2 flex flex-row justify-between" >
        <h4 className="text-2xl font-bold mb-4" onClick={handleClick}><a>{name}</a></h4>
        {/* <div onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </div> */}
      </div>
      <div className='flex flex-row space-x-10'>
        <div>
          <div className="mb-2">
            <span className="font-bold">Target Start Date:</span> {startDate}
          </div>
          <div className="mb-2">
            <span className="font-bold">Target End Date:</span> {endDate}
          </div>
        </div>
        <div className="mb-2">
          <span className="font-bold">Story Points:</span>
          <select
            value={storyPoints}
            onChange={(e) => handlePointsChange(id, e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="0"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="13">13</option>
          </select>
        </div>
        <div className="mb-2">
          <span className="font-bold">Status:</span>
          <select
            value={stage}
            onChange={(e) => handleStatusChange(id, e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="1">Todo</option>
            <option value="2">In Progress</option>
            <option value="3">Done</option>
          </select>
        </div>

      </div>

    </div>
  )
}

export default Feature
