import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import '../styles/chat-channels.css';
import Channel from './Channel.jsx';
import { actions } from '../slices/index.js';

function ChatChannels({ className }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channelsInfo);

  const showModal = (type, item = null) => {
    dispatch(actions.openModal({ type, isOpened: true, item }));
  };

  // eslint-disable-next-line max-len
  const channelsList = () => channels.map((channel) => <Channel channel={channel} key={channel.id} />);

  return (
    <div className={`chat-channels ${className}`}>
      <div className="chat-channels__header">
        <h2 className="chat-channels__title">{t('channels.channels')}</h2>
        <button
          type="button"
          className="chat-channels__add button button_small"
          onClick={() => showModal('channel_add')}
        >
          +
        </button>
      </div>
      <div className="chat-channels__list">
        {channels ? channelsList() : t('channels.empty')}
      </div>
    </div>
  );
}

export default ChatChannels;
