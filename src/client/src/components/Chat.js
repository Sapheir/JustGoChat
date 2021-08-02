import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { socket } from '../socket';

function Chat({addRoom}) {
    const { room } = useParams();
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        addRoom(room);
    }, [addRoom, room]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    }, []);

    return (
        <div className="chat">
            <Messages messages={messages} username={localStorage.getItem('username')} room={room}/>
            <ChatInput room={room}/>
        </div>
    );
}

export default Chat;