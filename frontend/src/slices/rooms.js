import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: []
};
  
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setDefaultStateRooms: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      // console.log(channels);
      state.rooms = channels;
      state.currentRoomId = currentChannelId;
      // console.log(state, '!!');
      // console.log(state, payload, 'state');
    },
    addRooms: (state) => {
        
    }
  //   increment: (state) => {
  //     state.value += 1;
  //   },
  //   decrement: (state) => {
  //     state.value -= 1
  //   },
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload
  //   },
  },
});

export const { actions } = roomsSlice;

export default roomsSlice.reducer;