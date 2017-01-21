const { ipcRenderer } = require('electron');
const path = require('path');
const userhome = require('user-home');


const app = new Vue({
  el: '#app',

  data: {
    path: '',
    items: [],
    places: [
      path.join(userhome, 'Documents'),
      path.join(userhome, 'Pictures'),
      path.join(userhome, 'Music'),
      path.join(userhome, 'Videos')
    ],
    showHiddenFiles: true,
    headerActions: {
      back: false,
      forward: false
    },

    // TODO Extract history management into a separate module so as to not
    // clutter up the instance data.
    history: [],
    historyIndex: -1
  },

  computed: {
    pathSegments: function() {
      let segments = this.path.split('/');
      return segments.slice(1, segments.length - 1).map((segment, i, array) => {
        return {
          name: segment,
          path: `/${array.slice(0, i + 1).join('/')}`
        };
      });
    },
    currentDirectory: function() {
      return this.path.split('/').pop() || '/';
    }
  },

  methods: {
    open: function(itempath, type='directory') {
      if (type === 'directory') {
        this.path = itempath;
      }
    },
    name: function(itempath) {
      return itempath.split('/').pop() || 'ROOT';
    },
    display: function(item) {
      return !this.showHiddenFiles && item.name[0] !== '.'
        || this.showHiddenFiles;
    },
    back: function() {
      if (this.historyIndex > 0) {
        this.path = this.history[--this.historyIndex];
      }
    },
    forward: function() {
      if (this.historyIndex < this.history.length - 1) {
        this.path = this.history[++this.historyIndex];
      }
    },
    toggleHiddenFiles: function() {
      this.showHiddenFiles = !this.showHiddenFiles;
    }
  },

  watch: {
    path: function(value, oldvalue) {
      ipcRenderer.send('read-path', value);
      window.localStorage.setItem('current-path', value);

      if (this.history[this.historyIndex] !== value) {
        this.history = [...this.history.slice(0, ++this.historyIndex), value];
      }
      this.headerActions.back = this.historyIndex > 0;
      this.headerActions.forward = this.historyIndex < this.history.length - 1;
    },
    showHiddenFiles: function(value, oldvalue) {
      window.localStorage.setItem('show-hidden-files', value);
    }
  }
});


const currentPath = window.localStorage.getItem('current-path');
app.path = currentPath || userhome;

const showHiddenFiles = window.localStorage.getItem('show-hidden-files');
app.showHiddenFiles = JSON.parse(showHiddenFiles);

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => app.items = files);
