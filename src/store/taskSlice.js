import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./uiSlice";
import { useParams } from 'react-router-dom';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: []
    },
    reducers: {
        replace(state, action) {
            state.tasks = action.payload;
        },
        addTask(state, action) {
            const newTask = action.payload;
            state.tasks.push(newTask);
        },
    }
});

export const { replace, addTask } = taskSlice.actions;
export const getTasks = (projectId,featureId, token) => {
    console.log(projectId, token);
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(`http://localhost:8080/api/v1/${projectId}/tasks?fid=${featureId}`, {
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
            let tasks = await fetchHandler();
            console.log(tasks)
            tasks = tasks.map(x => {
                return {
                    id: x.id,
                    columnId: x.stage.id,
                    content:x.name
                }
            })
            dispatch(replace(tasks));
        } catch (e) { }
    }
};

export const saveTask = (task,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/tasks', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(task)
            })
            console.log(res);
            const data = await res.json();
            if (data.error) {
                
            } else {
                dispatch(getTasks(task.projectId,task.featureId,token));
            }
        }
        sendRequest()
    }
};

export const updateTaskName = (id, name,projectId,featureId,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/tasks/'+id, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: name
            })
            const data = await res.json();
            if (data.error) {

            } else {
                dispatch(getTasks(projectId,featureId,token));
            }
        }
        sendRequest()
    }
};

export const removeTask = (id, projectId,featureId,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/tasks/' + id, {
                method: "DELETE",
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
                dispatch(getTasks(projectId,featureId,token));
            }
        }
        sendRequest()
    }
};

export const updateTaskStage = (taskId, stageId, projectId,featureId,token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await fetch('http://localhost:8080/api/v1/tasks/stage?task=' + taskId+'&stage='+stageId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log(res);
            const data = await res.json();
            if (data.error) {
                dispatch(
                    setNotification({
                        open: true,
                        message: "error updating task",
                        type: "error"
                    })
                );
            } else {
                dispatch(setNotification({
                    open: true,
                    message: "successfully updated task",
                    type: "success"
                }))
                dispatch(getTasks(projectId,featureId,token));
            }
        }
        sendRequest()
    }
};



export default taskSlice;


