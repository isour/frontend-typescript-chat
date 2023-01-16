import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { actions, rootState } from '../store/index';
import '../styles/channel.css';

interface IProps {
  readonly channel: IChannel;
}

const Channel: React.FC<IProps> = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state: rootState) => state.channelsInfo);
  const [active, setActive] = useState(false);

  const showModal = (type: string) => {
    dispatch(actions.openModal({ type, isOpened: true, item: channel }));
  };

  const openChannel = () => {
    dispatch(actions.setChannel(channel));
  };

  const openMenu = () => {
    setActive(true);
  };

  const removeClick = () => {
    setActive(false);
    showModal('channel_remove');
  };

  const renameClick = () => {
    setActive(false);
    showModal('channel_rename');
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

  const getChannelClassNames = (channelIter: IChannel) => classNames(
    { 'chat-channels__channel': true },
    { channel: true },
    { channel_active: active },
    { channel_current: currentChannelId === channelIter.id },
    { channel_removable: channelIter.removable },
  );

  const getMenuButton = () => (
    <>
      <button
        type="button"
        className="channel__button"
        onClick={() => openMenu()}
      >
        {t('channels.menu')}
      </button>
      {getSubmenu()}
    </>
  );

  const channelEl = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const { target } = e;
      if (channelEl && channelEl.current) {
        const ref = channelEl.current;
        if (!ref.contains(target as HTMLDivElement)) {
          setActive(false);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div key={channel.id} className={getChannelClassNames(channel)} ref={channelEl}>
      <button type="button" className="channel__content" onClick={() => openChannel()} onKeyDown={() => openChannel()}>
        {`# ${channel.name}`}
      </button>
      {channel.removable ? getMenuButton() : ''}
    </div>
  );
};

export default Channel;
