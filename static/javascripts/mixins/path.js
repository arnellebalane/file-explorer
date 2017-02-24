const { ipcRenderer } = require('electron');
const userhome = require('user-home');


const PathMixin = {

  data: {
    path: '',
    items: []
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

    // Emitted when the main process have read the contents of the file system
    // path that is being browsed.
    ipcRenderer.on('fs-data', (e, files) => this.items = files);
  }

};


module.exports = PathMixin;
