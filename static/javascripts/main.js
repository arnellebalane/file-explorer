const { ipcRenderer } = require('electron');
const path = require('path');
const userhome = require('user-home');

const Vue = require('./static/vendor/vue/dist/vue.min');
const HistoryMixin = require('./static/javascripts/mixins/history');
const SelectionMixin = require('./static/javascripts/mixins/selection');
const DisplayMixin = require('./static/javascripts/mixins/display');


const app = new Vue({
  el: '#app',

  mixins: [
    HistoryMixin,
    SelectionMixin,
    DisplayMixin
  ],

  data: {
    path: '',
    items: [],
    places: [
      path.join(userhome, 'Documents'),
      path.join(userhome, 'Pictures'),
      path.join(userhome, 'Music'),
      path.join(userhome, 'Videos')
    ],
    headerActions: {
      back: false,
      forward: false
    }
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
    refresh: function() {
      ipcRenderer.send('read-path', this.path);
    },
    delete: function(items) {
      ipcRenderer.send('delete-items', items);
      ipcRenderer.once('delete-status', (e, deleted) => {
        if (deleted) {
          this.refresh();
        }
      });
    }
  },

  watch: {
    path: function(value, oldvalue) {
      ipcRenderer.send('read-path', value);
      window.localStorage.setItem('current-path', value);

      this.push(value);
      this.clearSelection();
    }
  },

  created() {
    // Listen for events from the HistoryMixin
    this.$on('historyindexchange', e => {
      this.headerActions.back = !e.first;
      this.headerActions.forward = !e.last;
    });
  }
});


const currentPath = window.localStorage.getItem('current-path');
app.path = currentPath || userhome;

// Emitted when the main process have read the contents of the file system path
// that is being browsed.
ipcRenderer.on('fs-data', (e, files) => app.items = files);

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
