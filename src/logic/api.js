import { io } from 'socket.io-client';

import { actions } from '../slices/index.js';

const acknowledgeWithTimeout = (onSuccess, onTimeout) => {
  /* eslint-disable functional/no-let */
  let isCalled = false;

  const timerId = setTimeout(() => {
    if (isCalled) return;
    isCalled = true;
    onTimeout();
  }, 2000);

  return (...args) => {
    if (isCalled) return;
    isCalled = true;
    clearTimeout(timerId);
    onSuccess(args);
  };
};

const initSocketApi = (socket, store) => {
  const createEmit = (event) => (message, onSuccess, onTimeout) => {
    socket.emit(event, message, acknowledgeWithTimeout(onSuccess, onTimeout));
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(actions.createRoom({ room: payload }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeRoom({ room: payload }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameRoom({ room: payload }));
  });

  return {
    sendMessage: createEmit('newMessage'),
    createChannel: createEmit('newChannel'),
    removeChannel: createEmit('removeChannel'),
    renameChannel: createEmit('renameChannel'),
  };
};

const api = (store) => {
  const socket = io();

  return initSocketApi(socket, store);
};

export default api;
