// instance of axios

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgerbldr.firebaseio.com/'
});

export default instance;
