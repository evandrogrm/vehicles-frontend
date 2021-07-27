import axios from 'axios';

let authorization;
const loggedUserFromLocalStorage = localStorage.getItem('@@Vehicles-Challenge@@:loggedUser');
if (loggedUserFromLocalStorage) {
  const loggedUser = JSON.parse(loggedUserFromLocalStorage);
  authorization = loggedUser.token;
}

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Authorization': `Bearer ${authorization}`
  }
})
