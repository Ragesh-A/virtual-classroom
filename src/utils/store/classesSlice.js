import { createSlice } from "@reduxjs/toolkit";


const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: null,
    currentClass: null,
    assignments: null
  },
  reducers: {
    storeClasses: (state, action) => {
      state.classes = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload;
    },
    setAssignment: (state, action)=>{
      console.log(action, "action");
      state.assignments = action.payload;
    }
  }
})


export const { storeClasses, addClass, setCurrentClass, setAssignment } = classesSlice.actions;
export default classesSlice.reducer;