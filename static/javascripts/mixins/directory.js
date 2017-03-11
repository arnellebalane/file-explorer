const path = require('path');
const userhome = require('user-home');
const { ipcRenderer } = require('electron');

const AlertsMixin = require('./alerts');


const DirectoryMixin = {

    mixins: [
        AlertsMixin
    ],

    data: {
        path: '',
        items: [],
        creatingNewFolder: false,
        newFolderName: '',
        blocked: false
    },

    methods: {
        refresh() {
            ipcRenderer.send('read-path', this.path);
        },

        newFolder() {
            this.creatingNewFolder = true;
        },

        createFolder(name) {
            if (name.length > 0) {
                const folderPath = path.join(this.path, name);
                ipcRenderer.send('create-directory', folderPath);
                ipcRenderer.once('create-directory-response', (e, response) => {
                    if (response === true) {
                        this.creatingNewFolder = false;

                        this.refresh();
                        this.closeAlert('new-folder');
                    } else if (response.code === 'EEXIST') {
                        this.alert(`Name "${name}" already exists.`, 'new-folder');
                    }
                });
            } else {
                this.creatingNewFolder = false;
            }
        },

        cancelNewFolder() {
            this.creatingNewFolder = false;
            this.closeAlert('new-folder');
        }
    },

    computed: {
        pathSegments() {
            let segments = this.path.split('/');
            return segments.slice(1, segments.length - 1).map((segment, i, array) => {
                return {
                    name: segment,
                    path: `/${array.slice(0, i + 1).join('/')}`
                };
            });
        },

        currentDirectory() {
            return this.path.split('/').pop() || '/';
        }
    },

    watch: {
        path(value) {
            ipcRenderer.send('read-path', value);
            window.localStorage.setItem('current-path', value);
        }
    },

    created() {
        const currentPath = window.localStorage.getItem('current-path');
        this.path = currentPath || userhome;

        // Emitted when the main process have read the contents of the file
        // system path that is being browsed.
        ipcRenderer.on('fs-data', (e, files) => this.items = files);
    }

};


module.exports = DirectoryMixin;
