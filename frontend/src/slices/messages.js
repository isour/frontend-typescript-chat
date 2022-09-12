import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: []
};
  
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setDefaultStateMessages: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
      // console.log(state, '!!');
    //   console.log(state, payload, 'state');
    },
    addMessage: (state, {payload}) => {
      console.log(payload);
      const { message } = payload;
      state.messages.push(message);
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

export const { actions } = messagesSlice;

export default messagesSlice.reducer;