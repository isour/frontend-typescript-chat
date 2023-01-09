/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelActions } from './channels';

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id,
});

const initialState = messagesAdapter.getInitialState({});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.setDefaultStateChannels, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(channelActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        const ids = Object.values(state.entities)
          .filter((message) => message.channelId === id)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, ids);
      });
  },
});

const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);

const { actions } = messagesSlice;

export { selectors, actions };

export default messagesSlice.reducer;
