import { createSlice } from "@reduxjs/toolkit";


const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: null,
  },
  reducers: {
    storeClasses: (state, action) => {
      state.classes = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    }
  }
})


export const { storeClasses, addClass } = classesSlice.actions;
export default classesSlice.reducer;