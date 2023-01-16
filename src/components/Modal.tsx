import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions, rootState } from '../store/index';
import ChannelAdd from './modals/ChannelAdd';
import ChannelRename from './modals/ChannelRename';
import ChannelRemove from './modals/ChannelRemove';

const modalTypes = {
  channel_add: ChannelAdd,
  channel_remove: ChannelRemove,
  channel_rename: ChannelRename,
};

interface IComponentProps {
  readonly onHide: () => void;
}

interface IProps {
  readonly className?: string;
}

const Modal: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state: rootState) => state.modal);

  if (!type) return null;

  const Component: React.FC<IComponentProps> = modalTypes[type];

  const hideModal = () => {
    dispatch(actions.closeModal());
  };

  return (
    <Component onHide={hideModal} />
  );
};

export default Modal;
