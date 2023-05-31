import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    peopleSlide: false,
    notification: false,
  },
  reducers: {
    setPeopleSlide: (state, action) => {
      state.peopleSlide = !state.peopleSlide
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    }
  }
})

export const { setPeopleSlide, setNotification } = uiSlice.actions;

export default uiSlice.reducer;