import { Socket } from 'socket.io-client';

import { actions, rootState } from '../store/index';

type TonSuccess = (ar: readonly any[]) => any;
type TonTimeout = () => any;

const acknowledgeWithTimeout = (onSuccess: TonSuccess, onTimeout: TonTimeout) => {
  /* eslint-disable functional/no-let */
  let isCalled = false;

  const timerId = setTimeout(() => {
    if (isCalled) return;
    isCalled = true;
    onTimeout();
  }, 2000);

  return (...args: readonly any[]) => {
    if (isCalled) return;
    isCalled = true;
    clearTimeout(timerId);
    onSuccess(args);
  };
};

const initSocketApi = (socket: Readonly<Socket>, store: rootState) => {
  const createEmit = (event: string) => (
    message: string,
    onSuccess: TonSuccess,
    onTimeout: TonTimeout,
  ) => {
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

const api = (socket: Readonly<Socket>, store: rootState) => initSocketApi(socket, store);

export default api;
