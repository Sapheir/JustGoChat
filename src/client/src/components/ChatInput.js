import React, { useEffect, useState } from 'react';
import './ChatInput.css';
import { socket } from '../socket';

function ChatInput({room}) {
    const [message, setMessage] = useState('');

    const updateMessage = (textArea) => {
        setMessage(textArea.value);
        textArea.rows = Math.min(textArea.value.split("\n").length, 3);
    }

    const sendMessage = (message) => {
        if (message) {
            const textArea = document.querySelector('textarea');
            socket.emit('sendMessage', {message: message, room: room});
            textArea.value = '';
            updateMessage(textArea);
        }
    }

    const setCommand = (command) => {
        const textArea = document.querySelector('textarea');
        textArea.value = command;
        textArea.focus();
        document.querySelector('.commands-list').classList.toggle('show-list');
        updateMessage(textArea);
    }

    useEffect(() => {
        const listener = (event) => {
            if (event.keyCode === 13 && !event.shiftKey) {
                const message = document.querySelector('textarea').value;
                sendMessage(message);
                event.preventDefault();
            }
        }
        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        }
    });
    

    return (
        <div className="chat-input">
            <ul className="commands-list">
                <li onClick={() => setCommand("/users")}>/users</li>
                <li onClick={() => setCommand("/flipcoin")}>/flipcoin</li>
                <li onClick={() => setCommand("/weather ")}>/weather <span>[location]</span></li>
            </ul>
            <i className="fas fa-robot" onClick={() => document.querySelector('.commands-list').classList.toggle('show-list')}/>
            <textarea placeholder="Enter your message" maxLength="500" rows="1" onChange={(e) => updateMessage(e.target)}/>
            <i className="fas fa-paper-plane" onClick={() => sendMessage(message)}/>
        </div>
    );
}

export default ChatInput;