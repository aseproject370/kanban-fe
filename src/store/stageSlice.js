import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
    name: 'stage',
    initialState: {
        stages: []
    },
    reducers: {
        replace(state, action) {
            state.stages = action.payload;
        }
    }
});

export const { replace } = stageSlice.actions;
export const getStages = (projectId,token) => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('http://localhost:8080/api/v1/' + projectId + '/stages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await res.json();
            return Object.values(data);
        }
        try {
            let stages = await fetchHandler();
            stages = stages.map(x => {
                return {
                    id: x.id,
                    title:x.name
                }
            })
            dispatch(replace(stages));
        } catch (e) { }
    }
};

export const saveStage = (stage,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stages', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(stage)
            })
            const data = await res.json();
            if (data.error) {

            } else {
                dispatch(getStages(stage.projectId, token));
            }
        }
        sendRequest()
    }
};

export const updateStageName = (id, name,projectId,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stages/' + id, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: name
            })
            console.log(res)
            const data = await res.json();
            if (data.error) {

            } else {
                dispatch(getStages(projectId,token));
            }
        }
        sendRequest()
    }
};

export const deletStage = (id,projectId,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/stages/' + id, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await res.json();
            if (data.error) {

            } else {
                dispatch(getStages(projectId,token));
            }
        }
        sendRequest()
    }
};

export default stageSlice;


