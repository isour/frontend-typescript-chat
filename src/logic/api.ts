import { Socket } from 'socket.io-client';

import { actions, rootState, appDispatch } from '../store/index';
import { IApiType } from '../contexts/ApiContext';

type TonSuccess = (ar: readonly any[]) => any;
type TonTimeout = (error?: any) => any;

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

const initSocketApi = (socket: Readonly<Socket>, store: rootState):IApiType => {
  const createEmit = (event: string) => (
    message: IMessage | any,
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

export { TonSuccess, TonTimeout };

export default initSocketApi;
