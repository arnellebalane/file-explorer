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

    selection: [],
    selectionStart: '',

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
    refresh: function() {
      ipcRenderer.send('read-path', this.path);
    },
    focus: function(itempath, e={}) {
      if (e.ctrlKey) {
        this.selection.push(itempath);
        if (this.selection.length === 1) {
          this.selectionStart = itempath
        }
      } else if (e.shiftKey) {
        if (this.selection.length === 0) {
          this.selection = [itempath];
          this.selectionStart = itempath;
        } else {
          let start = this.items.findIndex(item => item.path === this.selectionStart);
          let end = this.items.findIndex(item => item.path === itempath);
          [start, end] = [Math.min(start, end), Math.max(start, end)];
          this.selection = this.items.slice(start, end + 1)
            .filter(item => this.display(item))
            .map(item => item.path);
        }
      } else {
        this.selection = [itempath];
        this.selectionStart = itempath;
      }
    },
    focused: function(itempath) {
      return this.selection.includes(itempath);
    },
    delete: function(items) {
      ipcRenderer.send('delete-items', items);
      ipcRenderer.once('delete-status', (e, deleted) => {
        if (deleted) {
          this.refresh();
        }
      });
    },
    clearSelection: function() {
      this.selection = [];
      this.selectionStart = '';
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

      this.clearSelection();
    },
    showHiddenFiles: function(value, oldvalue) {
      window.localStorage.setItem('show-hidden-files', value);
      this.clearSelection();
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

// Clear selected items when clicking somewhere else on page.
document.addEventListener('mousedown', _ => app.clearSelection());

// Handle keyboard events for keyboard navigation, selection, and interacting
// with the selected items.
const keyCodes = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  HOME: 36,
  END: 35,
  ENTER: 13,
  BACKSPACE: 8,
  DELETE: 46
};

// Items actions.
document.addEventListener('keydown', e => {
  if (e.keyCode === keyCodes.ENTER) {
    if (app.selection.length === 1) {
      const item = app.items.find(item => item.path === app.selection[0]);
      app.open(item.path, item.type);
    }
  } else if (e.keyCode === keyCodes.BACKSPACE) {
    app.back();
  } else if (e.keyCode === keyCodes.DELETE) {
    if (app.selection.length > 0) {
      app.delete(app.selection);
    }
  }
});

// Items selection and navigation.
document.addEventListener('keydown', e => {
  const items = app.items.filter(item => app.display(item));
  const selection = app.selection;
  const selectionStart = app.selectionStart;
  const ROW_ITEMS_COUNT = 5;
  let index = null;

  const ref = selection[0] === selectionStart ? selection.length - 1 : 0;
  const i = items.findIndex(item => item.path === selection[ref]);

  if (e.keyCode === keyCodes.LEFT) {
    index = i > 0 ? i - 1 : index;
  } else if (e.keyCode === keyCodes.RIGHT) {
    index = i < items.length - 1 ? i + 1 : index;
  } else if (e.keyCode === keyCodes.UP) {
    index = i >= ROW_ITEMS_COUNT ? i - ROW_ITEMS_COUNT : index;
  } else if (e.keyCode === keyCodes.DOWN) {
    index = i < items.length - ROW_ITEMS_COUNT ? i + ROW_ITEMS_COUNT : index;
  } else if (e.keyCode === keyCodes.HOME) {
    index = 0;
  } else if (e.keyCode === keyCodes.END) {
    index = items.length - 1;
  } else {
    return false;
  }

  if (index !== null) {
    const item = items[index];
    app.focus(item.path, e);
  }
});
