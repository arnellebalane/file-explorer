const { ipcRenderer } = require('electron');


module.exports = {
    methods: {
        readdir(path) {
            ipcRenderer.send('read-path', path);
        }
    },

    watch: {
        path() {
            this.readdir(this.path);
        }
    },

    created() {
        ipcRenderer.on('fs-data', (e, files) => this.items = files);
        this.readdir(this.path);
    }
};
