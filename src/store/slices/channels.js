/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
  selectId: (channel) => channel.id,
});

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setDefaultStateChannels: (state, { payload }) => {
      const { currentChannelId } = payload;
      channelsAdapter.setAll(state, payload.channels);
      state.currentChannelId = currentChannelId;
    },
    createChannel: channelsAdapter.addOne,
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const updatedChannel = {
        id,
        changes: {
          name,
        },
      };
      channelsAdapter.updateOne(state, updatedChannel);
    },
    setChannel: (state, { payload }) => {
      const { id } = payload;
      state.currentChannelId = id;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      channelsAdapter.removeOne(state, id);
      state.currentChannelId = 1;
    },
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channelsInfo);

const { actions } = channelsSlice;

export { selectors, actions };

export default channelsSlice.reducer;
