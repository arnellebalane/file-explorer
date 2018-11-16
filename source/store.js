import Vue from 'vue';
import Vuex from 'vuex';
import {ipcRenderer} from 'electron';
import userHome from 'user-home';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        path: userHome,
        items: [],
        showHiddenFiles: localStorage.getItem('show-hidden-files') === 'true',
        creatingNewFolder: false,
        error: null,
        selection: []
    },

    getters: {
        items(state) {
            if (state.showHiddenFiles) {
                return state.items;
            }
            return state.items.filter(item => !item.name.startsWith('.'));
        }
    },

    mutations: {
        setPath(state, path) {
            state.path = path;
            localStorage.setItem('path', path);
        },

        setItems(state, items) {
            state.items = items;
        },

        setError(state, error) {
            state.error = error;
        },

        toggleHiddenFiles(state) {
            state.showHiddenFiles = !state.showHiddenFiles;
            localStorage.setItem('show-hidden-files', state.showHiddenFiles);
        },

        setCreatingNewFolder(state, value) {
            state.creatingNewFolder = value;
        },

        setSelection(state, value) {
            state.selection = value;
        }
    },

    actions: {
        openPath(context, path) {
            ipcRenderer.send('read-path', path);
            ipcRenderer.once('fs-data', (e, files) => {
                context.commit('setItems', files);
            });
        },

        refreshPath(context) {
            context.dispatch('openPath', context.state.path);
        },

        deleteSelection(context) {
            ipcRenderer.send('delete-items', context.state.selection);
            ipcRenderer.once('delete-status', (e, deleted) => {
                if (deleted) {
                    context.commit('setSelection', []);
                    context.dispatch('refreshPath');
                }
            });
        }
    }
});
