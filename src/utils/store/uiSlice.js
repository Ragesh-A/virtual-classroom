import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    peopleSlide: false,
  },
  reducers: {
    setPeopleSlide: (state, action) => {
      state.peopleSlide = !state.peopleSlide
    },
  }
})

export const { setPeopleSlide } = uiSlice.actions;

export default uiSlice.reducer;