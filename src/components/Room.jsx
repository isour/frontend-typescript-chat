import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import renderModal from '../modals/index.js';
import { actions } from '../slices/index.js';

import '../styles/room.css';

function Room({ room }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentRoomId } = useSelector((state) => state.roomsInfo);
  const [active, setActive] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const openRoom = (currentRoom) => {
    dispatch(actions.setRoom(currentRoom));
  };

  const openMenu = () => {
    setActive(true);
  };

  const removeClick = () => {
    setActive(false);
    showModal('room_remove', room);
  };

  const renameClick = () => {
    setActive(false);
    showModal('room_rename', room);
  };

  const getSubmenu = () => (
    <div className="submenu room__submenu">
      <button type="button" className="submenu__link" onClick={removeClick}>
        {t('rooms.remove')}
      </button>
      <button type="button" className="submenu__link" onClick={renameClick}>
        {t('rooms.rename')}
      </button>
    </div>
  );

  const getRoomClassNames = (roomIter) => classNames(
    { 'chat-rooms__room': true },
    { room: true },
    { room_active: active },
    { room_current: currentRoomId === roomIter.id },
    { room_removable: roomIter.removable },
  );

  const getMenuButton = (currentRoom) => (
    <>
      <button
        type="button"
        className="room__button"
        onClick={() => openMenu(currentRoom)}
      >
        {t('rooms.menu')}
      </button>
      {getSubmenu(currentRoom)}
    </>
  );

  const roomEl = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (roomEl && roomEl.current) {
        const ref = roomEl.current;
        if (!ref.contains(e.target)) {
          setActive(false);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div key={room.id} className={getRoomClassNames(room)} ref={roomEl}>
      <button type="button" className="room__content" onClick={() => openRoom(room)} onKeyDown={() => openRoom(room)}>
        #
        {' '}
        {room.name}
      </button>
      {room.removable ? getMenuButton(room) : ''}
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
}

export default Room;
