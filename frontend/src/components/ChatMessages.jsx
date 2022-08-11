import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const ChatMessages = ({ className, children }) => {
    const { messages } = useSelector((state) => state.messagesInfo);

    const messagesList = () => {
        return '123';
    }
    
    const getMessages = () => {
        return Array.isArray(messages) ? messagesList() : 'Пусто';
    }
    
    return (
        <div className = {`chat-messages ${className}`}>
            <h2>ChatMessages</h2>
            {getMessages()}
        </div>
    );
}

export default ChatMessages;
