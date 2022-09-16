import React from 'react';
import {useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChatMessages = ({ className }) => {
    const { t } = useTranslation();
    const { messages } = useSelector((state) => state.messagesInfo);
    const { currentRoomId } = useSelector((state) => state.roomsInfo);

    const messagesList = () => {
        return messages.filter((message) => message.roomId === currentRoomId).map((message) => <div key={message.id}>{message.username}: {message.message}</div>);
    }
    
    const getMessages = () => {
        return Array.isArray(messages) && messages.length > 0 ? messagesList() : t('rooms.empty');
    }
    
    return (
        <div className = {`chat-messages ${className}`}>
            {getMessages()}
        </div>
    );
}

export default ChatMessages;
