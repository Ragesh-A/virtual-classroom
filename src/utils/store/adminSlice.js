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
      state.users = state.users.map(user=>{
        if (user._id === id){
          user.isBlocked = (user.isBlocked ? false : true); 
        }
        return user;
      })
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    blockAndUnblockClass: (state, action) => {
      state.classes = state.classes.map(single => {
        if (single._id === action.payload){
          single.isBlocked = !single.isBlocked
        }
        return single;
      })
    }
  }
})

export const { setUser, blockAndUnblock, setClasses, blockAndUnblockClass } = adminSlice.actions;

export default  adminSlice.reducer;