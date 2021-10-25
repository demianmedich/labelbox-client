import { configureStore } from '@reduxjs/toolkit';
import labelingReducer from '../slice/labelingSlice';

export default configureStore({
  reducer: {
    labeling: labelingReducer,
  },
});
