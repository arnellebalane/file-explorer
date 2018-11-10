import Vue from 'vue';
import Vuex from 'vuex';
import {ipcRenderer} from 'electron';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        path: '/',
        items: [],
        showHiddenFiles: localStorage.getItem('show-hidden-files') === 'true',
        creatingNewFolder: false,
        error: null,
        selection: []
    },

    mutations: {
        open(state, path) {
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
