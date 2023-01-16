import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import ChatChannels from './ChatChannels';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import useAuth from '../hooks/useAuth';
import { actions } from '../store/index';
import { TAuthContext } from '../contexts/AuthContext';

import '../styles/chat.css';

const Chat: React.FC = () => {
  const { getToken } = useAuth() as TAuthContext;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get(routes.backend.dataPath(), {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        dispatch(actions.setDefaultStateChannels(response.data));
      } catch (error: any) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }

        toast.error(t('errors.network'));
      }
    };

    GetData();

    return () => {
      console.log('Component will be unmount');
    };
  });

  return (
    <div className="chat-layout">
      <ChatChannels className="chat-layout__channels" />
      <ChatMessages className="chat-layout__messages" />
      <ChatForm className="chat-layout__form" />
    </div>
  );
};

export default Chat;
