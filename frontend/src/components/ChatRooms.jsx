import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import '../styles/chat-rooms.css';
import Room from './Room.jsx';
import getModal, {renderModal as renderModal} from '../modals/index.js';

const ChatRooms = ({ className, children }) => {
    const [modalInfo, setModalInfo] = useState({ type: null, item: null });
    const hideModal = () => setModalInfo({ type: null, item: null });
    const showModal = (type, item = null) => setModalInfo({ type, item });
    const { rooms } = useSelector((state) => state.roomsInfo);
    
    const roomsList = () => rooms.map((room) =>  {
        return <Room room={room} key={room.id}/>;
    });
    
    return (
        <div className = {`chat-rooms ${className}`}>
            <div className="chat-rooms__header">
                <h2 className="chat-rooms__title">Каналы</h2>
                <button type="button" className='chat-rooms__add' onClick={() => showModal( 'room_add' )}>Добавить канал</button>
            </div>
            <div className="chat-rooms__list">{rooms ? roomsList() : 'Пусто'}</div>
            {/* {roomsList} */}
            {renderModal({ modalInfo, hideModal })}
        </div>
    );
}

export default ChatRooms;
