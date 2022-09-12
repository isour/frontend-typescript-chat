import RoomAdd from './RoomAdd.jsx';
import RoomRename from './RoomRename.jsx';
import RoomRemove from './RoomRemove.jsx';
// import Remove from './Remove.jsx';
// import Rename from './Rename.jsx';

const modals = {
  room_add: RoomAdd,
  room_remove: RoomRemove,
  room_rename: RoomRename,
//   removing: Remove,
//   renaming: Rename,
};

const renderModal = ({ modalInfo, hideModal, setItems }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
};

const getModal = (modalName) => modals[modalName]


export {getModal as default, renderModal};
