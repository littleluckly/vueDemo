export default {
    toggleLoginStatus (state, payload) {
        state.loginStatus = payload.flag;
        state.username = payload.username;
    },
    toggleUsername (state, payload) {
        state.username = payload.username;
    },
    toggleHeaderVisible (state, payload) {
        state.headerVisible = payload.visible;
    },
    saveToken (state, token) {
        state.token = token;
    },
}