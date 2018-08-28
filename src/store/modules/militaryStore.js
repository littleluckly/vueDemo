import axios from 'axios';
export default {
    namespaced: true,
    state: {
        militaryNews: []
    },
    mutations: {
        fetchMilitaryNews (state, payload) {
            console.log(payload, 'payload');
            state.militaryNews = payload.data;
        }
    },
    actions: {
        fetchMilitaryNews ({commit}) { 
            axios({
                method: 'get',
                url: '/militaryNews' 
            }).then((res)=>{
                commit('fetchMilitaryNews', res.data); 
            })
        }
    }
};
