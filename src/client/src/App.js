import './App.css';
import Join from './components/Join';
import Navbar from './components/Navbar';
import RoomList from './components/RoomList';
import Chat from './components/Chat';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { socket } from './socket';


function App() {
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState('');

  const changeUsername = (newUsername) => {
    if (username !== newUsername) {
        socket.emit('changeUsername', {oldUsername: username, newUsername: newUsername});
        setUsername(newUsername);
    }
  }
  
  const addRoom = (room) => {
    const isJoined = rooms.find((joinedRoom) => room === joinedRoom);
    if (username && !isJoined) {
        socket.emit('join', {name: username, room: room});
        setRooms([...rooms, room]);
    }
  }

  useEffect(() => {
    const initialUsername = localStorage.getItem('username');
    if (initialUsername) {
      setUsername(initialUsername);
    }
    const initialRooms = localStorage.getItem('localRooms');
    if (initialRooms) {
        const parsedRooms = JSON.parse(initialRooms);
        setRooms(parsedRooms);
        for (const room of parsedRooms) {
            socket.emit('join', {name: initialUsername, room: room});
        }
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('localRooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  return (
    <Router>
      <div className="App">
        <Navbar username={username} changeUsername={changeUsername}/>
        <RoomList rooms={rooms}/>
        <Switch>
          <Route exact path='/'>
            <Join addRoom={addRoom}/>
          </Route>
          <Route path='/room/:room'>
            <Chat addRoom={addRoom}/>
          </Route>
          <Redirect to='/'/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
