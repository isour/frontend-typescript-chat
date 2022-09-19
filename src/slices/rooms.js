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
      state.rooms = channels;
      state.currentRoomId = currentChannelId;
    },
    createRoom: (state, {payload}) => {
      const { room } = payload;
      state.rooms.push(room);
    },
    renameRoom: (state, {payload}) => {
      const { room } = payload;
      let currentRoom = state.rooms.find(({id}) => room.id === id);
      currentRoom.name = room.name;
    },
    setRoom: (state, {payload}) => {
      const { id } = payload;
      state.currentRoomId = id;
    },
    removeRoom: (state, {payload}) => {
      const { room } = payload;
      state.rooms = state.rooms.filter(({id}) => room.id !== id);
      if (state.currentRoomId === room.id) {
        state.currentRoomId = 1;
      }
    },
  },
});

export const { actions } = roomsSlice;

export default roomsSlice.reducer;