import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const ChatRooms = ({ className, children }) => {
    const { rooms, currentRoomId } = useSelector((state) => state.roomsInfo);
    
    const roomsList = () => rooms.map((room) => 
        <li key={room.id} style={currentRoomId === room.id ? {color: 'red'} : {}}>{room.name}</li>
    );
    
    return (
        <div className = {`chat-rooms ${className}`}>
            <h2>Каналы</h2>
            <div>{rooms ? roomsList() : 'Пусто'}</div>
            {/* {roomsList} */}
        </div>
    );
}

export default ChatRooms;
