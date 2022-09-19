import { combineReducers } from '@reduxjs/toolkit';
import roomsInfo, { actions as roomsInfoActions } from './rooms.js';
import messagesInfo, { actions as messagesInfoActions } from './messages.js';

const actions = {
  ...roomsInfoActions,
  ...messagesInfoActions,
};

export { actions };

export default combineReducers({
  roomsInfo,
  messagesInfo,
});
