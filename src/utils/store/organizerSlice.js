import { createSlice } from '@reduxjs/toolkit';

const organizerSlice = createSlice({
  name: 'organizer',
  initialState: {
    classes: null,
    selectedClass: null,
    instructors: {
      existing: null,
      waiting: null,
    },
    announcements: null,
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    setInstructors: (state, action) => {
      state.instructors = action.payload;
    },
    removeInstructor: (state, action) => {
      state.instructors.instructors = state.instructors.instructors.filter(e=> e._id !== action.payload);
    },
    updateWaiting: (state, action) => {
      state.instructors.waiting.push(action.payload);
    },
    removeFromWaiting: (state, action) => {
      state.instructors.waiting = state.instructors.waiting.filter(e=>{
        return e.user !== action.payload;
      })
    },
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
  },
});

export const {
  setClasses,
  setSelectedClass,
  setInstructors,
  setAnnouncements,
  removeInstructor,
  updateWaiting,
  removeFromWaiting
} = organizerSlice.actions;

export default organizerSlice.reducer;
