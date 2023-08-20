import { createSlice } from '@reduxjs/toolkit';

const meetUpSlice = createSlice({
	name: 'meetup',
	initialState: {
		socket: null,
		localStream: null,
	},
	reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload
    },
		setLocalStream: (state, action) => {
			state.stream = action.payload;
		},
	},
});

export const { setLocalStream, setSocket } = meetUpSlice.actions;

export default meetUpSlice.reducer;
