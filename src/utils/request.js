import axios from 'axios';
import store from '@/store'

const service = axios.create({
    timeout: 10000
})
;
service.interceptors.request.use(config => {
    config.headers['token']= store.getters.token
    return config;
}, error=>{
    console.log(error)
    Promise.reject(error)
});
export default service;
