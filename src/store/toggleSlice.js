import { createSlice } from '@reduxjs/toolkit'

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        display: true
    },
    reducers: {
        toggle: state => {
            state.display = !state.display;
        }
    }
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice;
