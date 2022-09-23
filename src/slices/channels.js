/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channel: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setDefaultStateChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    createChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels.push(channel);
    },
    renameChannel: (state, { payload }) => {
      const { channel } = payload;
      const currentChannel = state.channels.find(({ id }) => channel.id === id);
      currentChannel.name = channel.name;
    },
    setChannel: (state, { payload }) => {
      const { id } = payload;
      state.currentChannelId = id;
    },
    removeChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels = state.channels.filter(({ id }) => channel.id !== id);
      if (state.currentChannelId === channel.id) {
        state.currentChannelId = 1;
      }
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
