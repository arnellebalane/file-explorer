const { ipcRenderer } = require('electron');
const userhome = require('user-home');


const app = new Vue({
  el: '#app',

  data: {
    path: '',
    directoryContents: [],
    showHiddenFiles: true
  },

  computed: {
    pathSegments: function() {
      let segments = this.path.split('/');
      segments = ['/', ...segments.slice(1, segments.length - 1)];
      return segments.map((segment, i, array) => {
        return {
          name: segment,
          path: `/${array.slice(1, i + 1).join('/')}`
        };
      });
    },

    currentDirectory: function() {
      return this.path.split('/').pop();
    }
  },

  methods: {
    open: function(path, type='directory') {
      if (type === 'directory') {
        this.path = path;
      }
    },

    display: function(item) {
      return !this.showHiddenFiles && item.name[0] !== '.'
        || this.showHiddenFiles;
    },

    toggleHiddenFiles: function() {
      this.showHiddenFiles = !this.showHiddenFiles;
    }
  },

  watch: {
    path: function(value, oldvalue) {
      // Request main process to give us the contents of the home directory.
      ipcRenderer.send('read-path', value);
      window.localStorage.setItem('current-path', value);
    }
  }
});


// Set initial current path to user home directory or whatever is stored in
// LocalStorage.
const currentPath = window.localStorage.getItem('current-path');
app.path = currentPath || userhome;

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => app.directoryContents = files);
