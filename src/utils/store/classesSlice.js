import { createSlice } from "@reduxjs/toolkit";


const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: null,
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    }
  }
})


export const { setClasses, addClass } = classesSlice.actions;
export default classesSlice.reducer;