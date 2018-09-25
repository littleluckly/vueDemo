import axios from 'axios';
import store from '@/store'

const service = axios.create({
    timeout: 5000
})
;
service.interceptors.request.use(config => {
    return config;
});
