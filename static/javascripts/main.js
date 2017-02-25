const { ipcRenderer } = require('electron');
const path = require('path');
const userhome = require('user-home');

const Vue = require('./static/vendor/vue/dist/vue.min');
const HistoryMixin = require('./static/javascripts/mixins/history');
const SelectionMixin = require('./static/javascripts/mixins/selection');
const DisplayMixin = require('./static/javascripts/mixins/display');
const DirectoryMixin = require('./static/javascripts/mixins/directory');
const ActionsMixin = require('./static/javascripts/mixins/actions');


const app = new Vue({
  el: '#app',

  mixins: [
    HistoryMixin,
    SelectionMixin,
    DisplayMixin,
    DirectoryMixin,
    ActionsMixin
  ],

  data: {
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
