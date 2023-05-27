import { createSlice } from '@reduxjs/toolkit';

const organizerSlice = createSlice({
  name: 'organizer',
  initialState: {
    classes: null,
    selectedClass: null,
    instructors: null,
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
} = organizerSlice.actions;

export default organizerSlice.reducer;
