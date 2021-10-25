import { createSlice } from '@reduxjs/toolkit';
import { EditMode } from '../constants';

export const labelingSlice = createSlice({
  name: 'labeling',
  initialState: {
    currentImgSrc: '',
    editMode: EditMode.SELECTION,
  },
  reducers: {
    setCurrentImgSrc: (state, action) => {
      state.currentImgSrc = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const { setCurrentImgSrc, setEditMode } = labelingSlice.actions;

export const editModeSelector = (state: any) => state.labeling.editMode;

export default labelingSlice.reducer;
