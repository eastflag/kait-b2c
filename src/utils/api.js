import axios from 'axios';

export default axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://api.eastflag.co.kr'
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'
})
