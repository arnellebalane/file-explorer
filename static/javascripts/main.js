const { ipcRenderer } = require('electron');

const Vue = require('./static/vendor/vue/dist/vue.min');
const HistoryMixin = require('./static/javascripts/mixins/history');
const SelectionMixin = require('./static/javascripts/mixins/selection');
const DisplayMixin = require('./static/javascripts/mixins/display');
const DirectoryMixin = require('./static/javascripts/mixins/directory');
const ActionsMixin = require('./static/javascripts/mixins/actions');
const PlacesMixin = require('./static/javascripts/mixins/places');
const AlertsMixin = require('./static/javascripts/mixins/alerts');


Vue.component('fe-directory-contents', {
    template: '#directory-contents',
    props: ['items', 'selection']
});


Vue.component('fe-new-folder', {
    template: '#new-folder',

    data() {
        return {
            name: ''
        };
    },

    mounted() {
        const input = this.$refs.newFolderInput;
        input.addEventListener('keydown', e => {
            e.stopPropagation();
            if (e.keyCode === 13) {
                this.$emit('done', this.name);
            } else if (e.keyCode === 27) {
                this.$emit('cancel', e);
            }
        });
        input.addEventListener('blur', e => this.$emit('cancel', e));
    }
});


Vue.component('fe-directory-item', {
    template: '#directory-item',
    props: ['item', 'selected', 'visible'],

    computed: {
        iconClass() {
            return `icon--${this.item.type}`;
        }
    },

    mounted() {
        const item = this.$refs.item;
        if (!item) {
            return false;
        }

        item.addEventListener('click', e => e.preventDefault());
        item.addEventListener('dblclick', e => {
            e.preventDefault();
            this.$emit('open', e);
        });
        item.addEventListener('mousedown', e => {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('select', e);
        });
    }
});


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
