import { io } from 'socket.io-client';

import { actions } from '../slices/index.js';

const ackTimeout = 2000;

const socketEvents = {
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
};

const acknowledgeWithTimeout = (onSuccess, onTimeout) => {
  let isCalled = false;

  const timerId = setTimeout(() => {
    if (isCalled) return;
    isCalled = true;
    onTimeout();
  }, ackTimeout);

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
    console.log(payload);
    store.dispatch(actions.createRoom({ room: payload }));
    
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeRoom({ room: payload }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameRoom({room: payload}));
  });

  return {
    sendMessage: createEmit('newMessage'),
    createChannel: createEmit('newChannel'),
    removeChannel: createEmit('removeChannel'),
    renameChannel: createEmit('renameChannel'),
    // renameChannel: () => console.log('here'),
  };
};

const api = (store) => {
    const socket = io();

    return initSocketApi(socket, store);
}

export default api;