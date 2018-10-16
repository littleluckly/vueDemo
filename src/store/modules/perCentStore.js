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
        // 获取个人信息
        async fetchUserInfo({commit}, params){
            const result = await request({
                method:'post',
                url:'/users/fetchUserInfo',
            })
            commit('saveUserInfo', {...result.data,host:result.host})
        },
        // 更新个人信息
        updateUserInfo({commit,state}, {form}){
            return new Promise((resolve,reject)=>{
                form.validate( async valid=>{
                    if(valid){
                        const result = await request({
                            method:'post',
                            url:'/users/updateUserInfo',
                            data:state.userInfoData
                        });
                        resolve(result.data);
                    }
                })
            });

        },
        // 更新头像
        async updateUserAvatar({commit,dispatch}, avatar){
            const result = await request({
                method:'post',
                url:'/users/updateUserAvatar',
                data: {avatar}
            });
            if(result.data.status==='ok'){
                dispatch('fetchUserInfo')
            }
        }
    },
};
