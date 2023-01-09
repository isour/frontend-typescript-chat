import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from '../store/index.js';

const ChatMessages = ({ className }) => {
  const { t } = useTranslation();
  const messages = useSelector(selectors.messagesSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });

  const messagesList = () => messages
    .filter((message) => message.channelId === currentChannelId)
    .map((message) => (
      <div key={message.id} className="message">
        <span className="message__author">{`${message.username}: `}</span>
        <span className="message__text">{message.message}</span>
      </div>
    ));

  const getMessages = () => (Array.isArray(messages) && messages.length > 0
    ? messagesList()
    : t('channels.empty'));

  return (
    <div className={`chat-messages ${className}`}>
      {getMessages()}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
