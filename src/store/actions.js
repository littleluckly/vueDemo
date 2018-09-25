export default {
    toggleLoginStatus (ctx, payload) {
        ctx.commit({
            type: 'toggleLoginStatus',
            flag: payload.flag,
            username: payload.username
        });
    },
    toggleUsername (ctx, payload) {
        ctx.commit({
            type: 'toggleUsername',
            username: payload.username
        });
    },
    toggleHeaderVisible ({commit}, payload) {
        commit({
            type: 'toggleHeaderVisible',
            visible: payload
        });
    }
}