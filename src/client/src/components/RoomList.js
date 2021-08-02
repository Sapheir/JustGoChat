import React from 'react';
import { Link } from 'react-router-dom';
import './RoomList.css';

function RoomList({ rooms }) {
    let roomsList = rooms.map((room, index) => 
        <li key={index}>
            <Link to={`/room/${room}`}>
                {room}
            </Link>
        </li>
    );
    return (
        <div className="room-list">
            <p>Your rooms:</p>
            <ul>{roomsList}</ul>
        </div>
    );
}

export default RoomList;