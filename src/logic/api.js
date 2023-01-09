import { actions } from '../store/index.js';

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
    store.dispatch(actions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(actions.createChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
  });

  return {
    sendMessage: createEmit('newMessage'),
    createChannel: createEmit('newChannel'),
    removeChannel: createEmit('removeChannel'),
    renameChannel: createEmit('renameChannel'),
  };
};

const api = (socket, store) => initSocketApi(socket, store);

export default api;
