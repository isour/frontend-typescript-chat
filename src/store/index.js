import { configureStore } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions, selectors as channelSelectors } from './slices/channels.js';
import messagesInfo, { actions as messagesInfoActions, selectors as messagesSelectors } from './slices/messages.js';
import modal, { actions as modalActions } from './slices/modals.js';

const actions = {
  ...channelsInfoActions,
  ...messagesInfoActions,
  ...modalActions,
};

const selectors = {
  channelSelectors,
  messagesSelectors,
};

export { actions, selectors };

const store = configureStore({
  reducer: {
    channelsInfo,
    messagesInfo,
    modal,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
