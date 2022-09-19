import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import ChatRooms from './ChatRooms.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatForm from './ChatForm.jsx';
import useAuth from '../hooks/useAuth.js';
import { actions } from '../slices/index.js';

import '../styles/chat.css';

function Chat() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get(routes.backend.dataPath(), {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        dispatch(actions.setDefaultStateRooms(response.data));
        dispatch(actions.setDefaultStateMessages(response.data));
      } catch (error) {
        rollbar.error(error);
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }

        toast.error(t('errors.network'));
      }
    };

    GetData();
  });

  return (
    <div className="chat-layout">
      <ChatRooms className="chat-layout__rooms" />
      <ChatMessages className="chat-layout__messages" />
      <ChatForm className="chat-layout__form" />
    </div>
  );
}

export default Chat;
