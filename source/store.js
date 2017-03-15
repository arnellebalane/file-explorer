const Vue = require('vue').default;
const Vuex = require('vuex');


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        path: require('user-home') || '/'
    },

    mutations: {
        open(state, path) {
            state.path = path;
        }
    }
});


module.exports = store;
