let users = [];

const addUser = ({ id, name, room }) => {
  const user = { id, name, room };
  users.push(user);
  return user;
}

const removeUser = (id) => {
  const user = getUser(id);
  users = users.filter((user) => user.id !== id);
  return user;
}

const getUser = (id) => users.find((user) => user.id === id);

const getRooms = (id) => users.filter((user) => user.id === id).map((user) => user.room)

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const isInRoom = (id, room) => getUsersInRoom(room).findIndex((user) => user.id === id) !== -1;

const changeUsername = (id, newUsername) => users = users.map((user) => user.id === id ? {id: user.id, name: newUsername, room: user.room} : user);

module.exports = { addUser, removeUser, getUser, getRooms, getUsersInRoom, isInRoom, changeUsername };
