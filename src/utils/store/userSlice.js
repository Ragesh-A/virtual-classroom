import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    userLogin: (state, action)=>{ 
      state.user = action.payload
    },
    userLogOut: (state) => {
      localStorage.clear()
      state.user = null
    },
    updateUser: (state, action) => {
      const {payload} = action
      state.user = {
        ...state,
        ...payload,
      }

    }
  }
})

export const {userLogin, userLogOut, updateUser} = userSlice.actions;

export default userSlice.reducer;