import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (state, action)=>{
      state = action.payload
    },
    logOut: (state) => {
      state = {}
    },
    updateUser: (state, action) => {
      const {payload} = action
      state = {
        ...state,
        ...payload,
      }

    }
  }
})