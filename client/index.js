/* eslint-disable no-undef */
// import { getColor } from './getColor.js'
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';

const getUsername = async () => {
  //falta implementar sistema de login y guardar el usuario en localStorage
  const username = localStorage.getItem('username'); //recuperamos el usuario, faltaria validar esto con el servidor
  if (username) {
    console.log(`User exsisted ${username}`);
    // return username
  }

  const res = await fetch('https://random-data-api.com/api/users/random_user');
  const { username: randomUsername } = await res.json();

  localStorage.setItem('username', randomUsername);
  return randomUsername;
};

const socket = io({
  auth: {
    token: '1312',
    username: await getUsername(),
    serverOffset: 0
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

socket.on('chat message', (msg, serverOffset, username) => {
  const colors = [
    '#16290a',
    '#223e0f',
    '#2d5214',
    '#386719',
    '#437b1e',
    '#4e9023'
  ];
  const randomNumber = Math.floor(Math.random() * colors.length);

  const userColor = colors[randomNumber];
  const item = `<li style="background-color: ${userColor};">
    <small>${username}</small>
    <p>${msg}</p>
    </li>`;
  messages.insertAdjacentHTML('beforeend', item);
  socket.auth.serverOffset = serverOffset;

  //scroll to bottom of messages
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', (e) => {
  console.log('button pressed');
  e.preventDefault();

  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
