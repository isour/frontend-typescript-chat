import React from 'react';

import ChannelAdd from './ChannelAdd.jsx';
import ChannelRename from './ChannelRename.jsx';
import ChannelRemove from './ChannelRemove.jsx';

const modals = {
  channel_add: ChannelAdd,
  channel_remove: ChannelRemove,
  channel_rename: ChannelRename,
};

const getModal = (modalName) => modals[modalName];

const renderModal = ({ modalInfo, hideModal, setItems }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return (
    <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />
  );
};

export default renderModal;
