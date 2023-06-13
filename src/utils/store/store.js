import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import classesSlice from "./classesSlice";
import adminSlice from "./adminSlice";
import organizerSlice from "./organizerSlice";
import uiSlice from "./uiSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    'ui': uiSlice,
    'user': userSlice,
    'classes': classesSlice,
    'admin': adminSlice,
    'organizer': organizerSlice,
    'chatMate': chatSlice,
  }
});

export default store;