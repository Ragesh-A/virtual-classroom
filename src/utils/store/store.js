import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import classesSlice from "./classesSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    'user': userSlice,
    'classes': classesSlice,
    'admin': adminSlice,
  }
});

export default store;