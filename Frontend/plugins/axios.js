import axios from 'axios';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    
    const axiosInstance = axios.create({
      // baseURL: 'http://localhost:8080',
    });
  
    // Optional: Add interceptors or defaults here
    // axiosInstance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
    // axiosInstance.interceptors.request.use(config => { ... });
  
    // Make your Axios instance available in your application as $axios
    nuxtApp.provide('axios', axiosInstance);
  });
