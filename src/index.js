const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getRooms, changeUsername, isInRoom } = require('./users');
const { isCommand, getBotResponse } = require('./chatbot');


io.on('connect', (socket) => {

    socket.on('join', ({ name, room }) => {
        const isJoined = isInRoom(socket.id, room);
        if (!isJoined) {
            const user = addUser({ id: socket.id, name: name, room: room });
            socket.join(user.room);
            socket.emit('message', { username: '', text: `Welcome to room ${user.room}, ${user.name}!`, room: user.room});
            socket.broadcast.to(user.room).emit('message', { username: '', text: `${user.name} has joined the room!`, room: user.room});    
        } 
    });

    socket.on('changeUsername', ({oldUsername, newUsername}) => {
        changeUsername(socket.id, newUsername);
        const rooms = getRooms(socket.id);
        for (const room of rooms) {
            io.to(room).emit('message', { username: '', text: `${oldUsername} changed their username to ${newUsername}.`, room: room});
        }
    })

    socket.on('sendMessage', ({message, room}) => {
        const user = getUser(socket.id);
        io.to(room).emit('message', { username: user.name, text: message, room: room, id: socket.id });
        if (isCommand(message)) {
            getBotResponse(message, room).then(response => {
                io.to(room).emit('message', { username: 'Chatbot', text: `${response}`, room: room});
            });
        }
    });

    socket.on('disconnect', () => {
        const rooms = getRooms(socket.id);
        const user = removeUser(socket.id);
        if(user) {
            for (const room of rooms) {
                io.to(room).emit('message', { username: '', text: `${user.name} has left.`, room: user.room});
            }
        }
    })
});

server.listen(process.env.PORT || 5000, () => console.log('Server has started'));
