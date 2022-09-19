import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import '../styles/chat-rooms.css';
import Room from './Room.jsx';
import renderModal from '../modals/index.js';

function ChatRooms({ className }) {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });
  const { rooms } = useSelector((state) => state.roomsInfo);

  const roomsList = () => rooms.map((room) => <Room room={room} key={room.id} />);

  return (
    <div className={`chat-rooms ${className}`}>
      <div className="chat-rooms__header">
        <h2 className="chat-rooms__title">{t('rooms.rooms')}</h2>
        <button
          type="button"
          className="chat-rooms__add button button_small"
          onClick={() => showModal('room_add')}
        >
          +
        </button>
      </div>
      <div className="chat-rooms__list">
        {rooms ? roomsList() : t('rooms.empty')}
      </div>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
}

export default ChatRooms;
