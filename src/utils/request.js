import axios from 'axios';
import store from '@/store'

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(config => {
    console.log('store',store)
    config.headers['token']= store.getters.token
    return config;
}, error=>{
    console.log(error)
    Promise.reject(error)
});

service.interceptors.response.use(response => {
    if(response.data.status==='4001'){
        // token过期
        // 查询字符串中保存当前页面url
        window.location.replace(`/#/login?preUrl=/${window.location.hash}`)
        return {}
    }else{
        response.host='http://127.0.0.1:5577/'
        return response;
    }
}, error=>{
    console.log(error)
    Promise.reject(error)
});
export default service;
