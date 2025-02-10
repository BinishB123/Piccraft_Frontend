import axios from 'axios';

export const apiUrl =" https://piccraft-backend-tg36.vercel.app"

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,                
  headers: {
    'Content-Type': 'application/json', 
   

  
  }
});