import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    userLogin: (state, action)=>{
      state = action.payload
    },
    userLogOut: (state) => {
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

export const {userLogin, userLogOut, updateUser} = userSlice.actions;

export default userSlice.reducer;