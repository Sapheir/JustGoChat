import React, { useEffect } from 'react';
import './Messages.css';
import { socket } from '../socket';

function Messages({ messages, room }) {
    let messageList = messages.filter((message) => message.room === room).map((message, index) => (
        <li key={index} className={message.id && message.id === socket.id ? "sent" : message.username ? "received" : "notification"}>
            <blockquote>{message.text}</blockquote>
            <cite>{message.username}</cite>
        </li>
    ));
    useEffect(() => {
        document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;
    }, [messageList]);
    
    return (
        <ul className="messages">
            {messageList}
        </ul>
    );
}

export default Messages;