import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./uiSlice";
import { useParams } from 'react-router-dom';

const featureSlice = createSlice({
    name: 'feature',
    initialState: {
        features: []
    },
    reducers: {
        replace(state, action) {
            console.log(action.payload)
            state.features = action.payload;
        },
    }
});

export const { replace } = featureSlice.actions;
export const getFeatures = (projectId, token) => {
    console.log(projectId, token);
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + projectId + '/features', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await res.json();
            return data;
        }
        try {
            let features = await fetchHandler();
            console.log(features)
            features = features.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    stage: x.featureStage.id,
                    startDate: x.startDate,
                    endDate: x.endDate,
                    storyPoints: x.storyPoints
                }
            })
            dispatch(replace(features));
        } catch (e) { }
    }
};

export const saveFeature = (feature, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + feature.projectId + '/features', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(feature)
            })
            console.log(res);
            const data = await res.json();
            if (data.error) {

            } else {
                dispatch(getFeatures(feature.projectId, token));
            }
        }
        sendRequest()
    }
};

export const removeFeature = (id, projectId, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + id+'/features', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            console.log(res)
            if (data.error) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "error deleting task",
                        type: "error"
                    })
                );
            } else {
                dispatch(setNotification({
                    open: true,
                    message: "successfully deleted task",
                    type: "success"
                }))
                dispatch(getFeatures(projectId, token));
            }
        }
        sendRequest()
    }
};

export const updateFeatureStage = (featureId, projectId, newStage, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch(`http://localhost:8080/api/v1/features?fid=${featureId}&sid=${newStage}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            if (data.error) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "error updating feture",
                        type: "error"
                    })
                );
            } else {
                dispatch(setNotification({
                    open: true,
                    message: "successfully updated feature",
                    type: "success"
                }))
                dispatch(getFeatures(projectId, token));
            }
        }
        sendRequest()
    }
};

export const updateStoryPoints = (featureId, projectId, points, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch(`http://localhost:8080/api/v1/features/points?fid=${featureId}&points=${points}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            if (data.error) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "error updating story points",
                        type: "error"
                    })
                );
            } else {
                dispatch(setNotification({
                    open: true,
                    message: "successfully updated story points",
                    type: "success"
                }))
                dispatch(getFeatures(projectId, token));
            }
        }
        sendRequest()
    }
};

export default featureSlice;


