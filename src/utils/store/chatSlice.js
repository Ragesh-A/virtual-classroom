import { createSlice } from '@reduxjs/toolkit';

const chatMateSlice = createSlice({
  name: 'chatMate',
  initialState: {
    selectedChat: null,
    chats: null
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    SetChats: (state, action) => {
      state.chats = action.payload;
    },
    addChats: (state, action) => {
      state.chats = [...state.chats, action.payload]
    },
  }
})

export const { setSelectedChat, SetChats, addChats } = chatMateSlice.actions

export default chatMateSlice.reducer;