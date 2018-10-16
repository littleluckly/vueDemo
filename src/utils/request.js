import axios from 'axios';
import store from '@/store'

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(config => {
    config.headers['token']= store.getters.token
    return config;
}, error=>{
    console.log(error)
    Promise.reject(error)
});

service.interceptors.response.use(response => {
    response.host='http://127.0.0.1:5577/'
    return response;
}, error=>{
    console.log(error)
    Promise.reject(error)
});

export default service;
