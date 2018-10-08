import request from '@/utils/request'
export default {
    namespaced: true,
    state: {
        userInfoData:{}
    },
    mutations: {
        saveUserInfo(state,payload){
            state.userInfoData = payload;
        }
    },
    actions: {
        fetchUserInfo({commit}, params){
            commit('saveUserInfo',{username:'测试的数据'})
        },
        updateUserInfo({commit,state}, {form}){
            form.validate(valid=>{
                if(valid){
                    console.log(state.userInfoData)
                    // commit('saveUserInfo',{username:'更新后的数据'})
                }
            })
        },
    },
};