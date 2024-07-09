import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://kakao-tech-campus-mock-server-yeahzee0421.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
