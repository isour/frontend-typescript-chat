import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { actions } from '../store/index.js';

import '../styles/channel.css';

function Channel({ channel }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const [active, setActive] = useState(false);

  const showModal = (type, item = null) => {
    dispatch(actions.openModal({ type, isOpened: true, item }));
  };

  const openChannel = (currentChannel) => {
    dispatch(actions.setChannel(currentChannel));
  };

  const openMenu = () => {
    setActive(true);
  };

  const removeClick = () => {
    setActive(false);
    showModal('channel_remove', channel);
  };

  const renameClick = () => {
    setActive(false);
    showModal('channel_rename', channel);
  };

  const getSubmenu = () => (
    <div className="submenu channel__submenu">
      <button type="button" className="submenu__link" onClick={removeClick}>
        {t('channels.remove')}
      </button>
      <button type="button" className="submenu__link" onClick={renameClick}>
        {t('channels.rename')}
      </button>
    </div>
  );

  const getChannelClassNames = (channelIter) => classNames(
    { 'chat-channels__channel': true },
    { channel: true },
    { channel_active: active },
    { channel_current: currentChannelId === channelIter.id },
    { channel_removable: channelIter.removable },
  );

  const getMenuButton = (currentChannel) => (
    <>
      <button
        type="button"
        className="channel__button"
        onClick={() => openMenu(currentChannel)}
      >
        {t('channels.menu')}
      </button>
      {getSubmenu(currentChannel)}
    </>
  );

  const channelEl = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (channelEl && channelEl.current) {
        const ref = channelEl.current;
        if (!ref.contains(e.target)) {
          setActive(false);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div key={channel.id} className={getChannelClassNames(channel)} ref={channelEl}>
      <button type="button" className="channel__content" onClick={() => openChannel(channel)} onKeyDown={() => openChannel(channel)}>
        {`# ${channel.name}`}
      </button>
      {channel.removable ? getMenuButton(channel) : ''}
    </div>
  );
}

export default Channel;
