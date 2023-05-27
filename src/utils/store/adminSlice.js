import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: null,
    organizations: null,
    classes: null,
    subscribers: null,
    carousals: null,
  },
  reducers: {
    setUser : (state, action) => {
      state.users = action.payload;
    },
    blockAndUnblock: (state, action)=>{
      const id = action.payload
      console.log(action.payload, 'id')
      state.users = state.users.map(user=>{
        if (user._id === id){
          user.isBlocked = (user.isBlocked ? false : true); 
        }
        return user;
      })
      console.log(state.users, "store")
    },
  }
})

export const { setUser, blockAndUnblock } = adminSlice.actions;

export default  adminSlice.reducer;