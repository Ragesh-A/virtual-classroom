import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import classesSlice from "./classesSlice";
import adminSlice from "./adminSlice";
import organizerSlice from "./organizerSlice";

const store = configureStore({
  reducer: {
    'user': userSlice,
    'classes': classesSlice,
    'admin': adminSlice,
    'organizer': organizerSlice
  }
});

export default store;