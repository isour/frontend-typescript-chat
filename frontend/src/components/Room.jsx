import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames';
import getModal, {renderModal as renderModal} from '../modals/index.js';
import { actions } from '../slices/index.js';

import '../styles/room.css';

const Room = ({room}) => {
    const dispatch = useDispatch();
    const { currentRoomId } = useSelector((state) => state.roomsInfo);
    const [active, setActive] = useState(false);
    const [modalInfo, setModalInfo] = useState({ type: null, item: null });
    const hideModal = () => setModalInfo({ type: null, item: null });
    const showModal = (type, item = null) => setModalInfo({ type, item });

    const openRoom = (room) => {
        dispatch(actions.setRoom(room))
    }
    
    const openMenu = (room) => {
        setActive(true);
    }

    const removeClick = (event) => {
        setActive(false);
        showModal( 'room_remove', room );
    }
    
    const renameClick = (event) => {
        setActive(false);
        showModal( 'room_rename', room );
    }

    const getSubmenu = () => {
        return (
            <div className='submenu room__submenu'>
                <button type="button" className='submenu__link' onClick={removeClick}>Удалить</button>
                <button type="button" className='submenu__link' onClick={renameClick}>Переименовать</button>
            </div>
        )
    }

    const getRoomClassNames = (room) => {
        return classNames(
            { 'chat-rooms__room': true }, 
            { 'room': true }, 
            { 'room_active': active }, 
            { 'room_current': currentRoomId === room.id }, 
            { 'room_removable': room.removable }, 
          )
    }

    const getMenuButton = (room) => {

        return (
            <>
                <button type="button" className='room__button' onClick={() => openMenu(room)}>Меню</button>
                {(getSubmenu(room))}
            </>
        );
    }

    const roomEl = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if(roomEl && roomEl.current){
                const ref = roomEl.current
                if(!ref.contains(e.target)){
                    setActive(false);
                }
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);
    
    return (
        <div key={room.id} className={getRoomClassNames(room)} ref={roomEl}>
            <div className="room__content" onClick={() => openRoom(room)}># {room.name}</div>
            {(room.removable ? getMenuButton(room) : '')}
            {renderModal({ modalInfo, hideModal })}
        </div>
    )
}

export default Room;