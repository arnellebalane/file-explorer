const { ipcRenderer } = require('electron');
const path = require('path');
const userhome = require('user-home');

const Vue = require('./static/vendor/vue/dist/vue.min');
const HistoryMixin = require('./static/javascripts/mixins/history');
const SelectionMixin = require('./static/javascripts/mixins/selection');
const DisplayMixin = require('./static/javascripts/mixins/display');
const DirectoryMixin = require('./static/javascripts/mixins/directory');


const app = new Vue({
  el: '#app',

  mixins: [
    HistoryMixin,
    SelectionMixin,
    DisplayMixin,
    DirectoryMixin
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

  methods: {
    open(itempath, type='directory') {
      if (type === 'directory') {
        this.path = itempath;
      }
    },

    delete(items) {
      ipcRenderer.send('delete-items', items);
      ipcRenderer.once('delete-status', (e, deleted) => {
        if (deleted) {
          this.refresh();
        }
      });
    }
  },

  watch: {
    path: function(value) {
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
