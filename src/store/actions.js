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
    toggleHeaderVisible ({commit}, {currRoute}) {
        // 登陆页、个人中心页不需要显示Header组件
        let flag;
        if (currRoute !== 'perCenter' && currRoute !== 'Login' && currRoute !== undefined) {
            flag=true;
        } else {
            flag=false;
        };
        console.log('currRoute',currRoute)
        commit({
            type: 'toggleHeaderVisible',
            visible: flag
        });
    }
}