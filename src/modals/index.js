import React from 'react';

import RoomAdd from './RoomAdd.jsx';
import RoomRename from './RoomRename.jsx';
import RoomRemove from './RoomRemove.jsx';

const modals = {
  room_add: RoomAdd,
  room_remove: RoomRemove,
  room_rename: RoomRename,
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
