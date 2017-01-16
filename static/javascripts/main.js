const { ipcRenderer } = require('electron');
const userhome = require('user-home');


const app = new Vue({
  el: '#app',

  data: {
    path: userhome,
    directoryContents: []
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
  }
});


// Request main process to give us the contents of the home directory.
ipcRenderer.send('read-path', userhome);

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => app.directoryContents = files);

// Emitted when the path being displayed changes.
ipcRenderer.on('path-change', (e, path) => app.path = path);
