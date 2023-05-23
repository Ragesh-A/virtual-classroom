import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import classesSlice from "./classesSlice";

const store = configureStore({
  reducer: {
    'user': userSlice,
    'classes': classesSlice,
  }
});

export default store;