import axios from 'axios';

export const apiUrl ="https://piccraft-backend.onrender.com"
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,                
  headers: {
    'Content-Type': 'application/json', 
   

  
  }
});