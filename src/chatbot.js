const { getUsersInRoom } = require('./users');
const fetch = require('node-fetch');

const getUsersList = ({room}) => {
    let response = "The users connected in this room are: \n";
    for (const user of getUsersInRoom(room))
        response += `${user.name}, `;
    response = response.substring(0, response.length-2)+'.';
    return response;
}

const getFlipCoin = () => `Coin flip result: ${Math.random() < 0.5 ? 'head' : 'tail'}!`;

const getWeather = async ({message}) => {
    const location = message.substring(9).trimStart();
    const API_KEY = ''; // openweather API key here
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod >= 400) {
                throw data.message;
            }
            const description = data.weather[0].description, temperature = data.main.temp, name = data.name, country = data.sys.country;
            return `The weather in ${name}, ${country} is: ${description}. The temperature is: ${temperature} °C.`
        })
        .catch(error => {
            return `An error occurred: ${error}`;
        });
    return result;
}

const commands = [{query: "/users", response: getUsersList}, {query: "/flipcoin", response: getFlipCoin}, {query: "/weather", response: getWeather}];


const isCommand = (message) => {
    for (const command of commands)
        if (message.startsWith(command.query)) 
            return command.response;
    return false;
}

const getBotResponse = async (message, room) => {
    const response = isCommand(message);
    return await response({message: message, room: room});
}

module.exports = { isCommand, getBotResponse };