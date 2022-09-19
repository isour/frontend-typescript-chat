/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setDefaultStateMessages: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.messages.push(message);
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
