import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './toggleSlice';
import authSlice from './authSlice';
import boardSlice from './boardSlice';
import uiSlice from './uiSlice';
import tasksSlice from './taskSlice';
import stageSlice from './stageSlice';
import featureSlice from './featureSlice';

const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    auth: authSlice.reducer,
    board: boardSlice.reducer,
    ui: uiSlice.reducer,
    task: tasksSlice.reducer,
    stage: stageSlice.reducer,
    feature: featureSlice.reducer
  }
});

export default store;