import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const ChatMessages = ({ className, children }) => {
    const { messages } = useSelector((state) => state.messagesInfo);
    const { currentRoomId } = useSelector((state) => state.roomsInfo);

    const messagesList = () => {
        return messages.filter((message) => message.roomId === currentRoomId).map((message) => <div key={message.id}>{message.username}: {message.message}</div>);
    }
    
    const getMessages = () => {
        return Array.isArray(messages) && messages.length > 0 ? messagesList() : 'Пусто';
    }
    
    return (
        <div className = {`chat-messages ${className}`}>
            <h2>ChatMessages</h2>
            {getMessages()}
        </div>
    );
}

export default ChatMessages;
