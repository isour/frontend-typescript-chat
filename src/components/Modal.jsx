import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../store/index.js';
import ChannelAdd from './modals/ChannelAdd.jsx';
import ChannelRename from './modals/ChannelRename.jsx';
import ChannelRemove from './modals/ChannelRemove.jsx';

const modalTypes = {
  channel_add: ChannelAdd,
  channel_remove: ChannelRemove,
  channel_rename: ChannelRename,
};

function Modal() {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.modal);

  if (!type) return null;

  const Component = modalTypes[type];

  const hideModal = () => {
    dispatch(actions.closeModal({}));
  };

  return (
    <Component onHide={hideModal} />
  );
}

export default Modal;
