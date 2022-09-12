import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { createSlice } from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';

import routes from "../routes";

import ChatRooms from './ChatRooms.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatForm from './ChatForm.jsx';
import useAuth from "../hooks/useAuth.js";
import roomSlice from "../slices/rooms.js";
import { actions } from '../slices/index.js';
import { getCurrentChannel } from "../selectors/index.js";

import '../styles/chat.css';

const Chat = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    // const userName = useContext(AuthContext);

    useEffect(() => {
        const GetData = async () => {
            try {
                const response = await axios.get(routes.backend.dataPath(), { headers: {"Authorization" : `Bearer ${auth.getToken()}`} });
                // dispatch(createSlice.addRooms('qwe'));
                // console.log(actions);
                dispatch(actions.setDefaultStateRooms(response.data));
                dispatch(actions.setDefaultStateMessages(response.data));
                // console.log(response.data, "DATA");
            } catch(error) {
                console.log(error);
            }
        }

        GetData();
    });

    
    return (
        <div className='chat-layout'>
            <ChatRooms className="chat-layout__rooms" />
            <ChatMessages className="chat-layout__messages" />
            <ChatForm className="chat-layout__form" />
        </div>
    );
}

export default Chat;
