const Vue = require('vue').default;
const Vuex = require('vuex');
const { ipcRenderer } = require('electron');


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        path: '/',
        items: []
    },

    mutations: {
        open(state, path) {
            state.path = path;
            localStorage.setItem('path', path);
        },

        setItems(state, items) {
            state.items = items;
        }
    },

    actions: {
        openPath(context, path) {
            context.commit('open', path);
            context.dispatch('readCurrentDirectoryContents');
        },

        refreshPath(context) {
            const path = context.state.path;
            context.dispatch('readCurrentDirectoryContents', path);
        },

        readCurrentDirectoryContents(context) {
            ipcRenderer.send('read-path', context.state.path);
            ipcRenderer.once('fs-data', (e, files) => {
                context.commit('setItems', files);
            });
        }
    }
});


module.exports = store;
