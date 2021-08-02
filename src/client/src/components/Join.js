import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

function Join({ addRoom }) {
    const [room, setRoom] = useState('');
    return (
        <div className="join">
            <form>
                <label>Room:</label>
                <input type="text" onInput={(e) => setRoom(e.target.value)}/>
            </form>
            <Link to={`/room/${room}`} onClick={() => addRoom(room.trimStart().trimEnd())}> 
                Join room 
            </Link>
        </div>
    );
}

export default Join;