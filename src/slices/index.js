import { combineReducers } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions } from './channels.js';
import messagesInfo, { actions as messagesInfoActions } from './messages.js';
import modal, { actions as modalActions } from './modals.js';

const actions = {
  ...channelsInfoActions,
  ...messagesInfoActions,
  ...modalActions,
};

export { actions };

export default combineReducers({
  channelsInfo,
  messagesInfo,
  modal,
});
