import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import classesSlice from "./classesSlice";
import adminSlice from "./adminSlice";
import organizerSlice from "./organizerSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    'ui': uiSlice,
    'user': userSlice,
    'classes': classesSlice,
    'admin': adminSlice,
    'organizer': organizerSlice,
  }
});

export default store;