import { configureStore } from '@reduxjs/toolkit';
import labelingReducer from '../labeling/labelingSlice';

export default configureStore({
  reducer: {
    labeling: labelingReducer,
  },
});
