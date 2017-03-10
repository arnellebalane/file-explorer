const { ipcRenderer } = require('electron');

const Vue = require('./static/vendor/vue/dist/vue.min');
const HistoryMixin = require('./static/javascripts/mixins/history');
const SelectionMixin = require('./static/javascripts/mixins/selection');
const DisplayMixin = require('./static/javascripts/mixins/display');
const DirectoryMixin = require('./static/javascripts/mixins/directory');
const ActionsMixin = require('./static/javascripts/mixins/actions');
const PlacesMixin = require('./static/javascripts/mixins/places');
const AlertsMixin = require('./static/javascripts/mixins/alerts');


const app = new Vue({
    el: '#app',

    mixins: [
        HistoryMixin,
        SelectionMixin,
        DisplayMixin,
        DirectoryMixin,
        ActionsMixin,
        PlacesMixin,
        AlertsMixin
    ],

    data: {
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
        this.$on('historyindexchange', e => {
            this.headerActions.back = !e.first;
            this.headerActions.forward = !e.last;
        });
    }
});
