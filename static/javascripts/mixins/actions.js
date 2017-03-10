const { ipcRenderer } = require('electron');
const keyCodes = require('../utils/keycodes');

const DirectoryMixin = require('./directory');
const HistoryMixin = require('./history');
const SelectionMixin = require('./selection');
const AlertsMixin = require('./alerts');


const instances = [];


/**
 *  Handles keyboard actions performed on an app.
 *  @param {Vue} app The Vue instance to perform the action to.
 *  @param {KeyboardEvent} e
 **/
function keyboardAction(app, e) {
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
}


document.addEventListener('keydown', e => {
    instances.forEach(app => keyboardAction(app, e));
});


const ActionsMixin = {

    mixins: [
        HistoryMixin,
        DirectoryMixin,
        SelectionMixin,
        AlertsMixin
    ],

    data: {
        path: ''
    },

    methods: {
        /**
         *  @param {String} itempath The absolute path to the item to be opened.
         *  @param {String} type (optional) The type of the item to be opened.
         *      This determines how the item is going to be "opened".
         **/
        open(itempath, type='directory') {
            if (type === 'directory') {
                this.path = itempath;
            }
        },

        /**
         *  Sends request to main process to delete items.
         *  @param {Array} items The array of absolute item paths of the items
         *      that are to be deleted.
         **/
        delete(items) {
            this.alert('Are you sure you want to delete the selected items?', 'delete', {
                type: 'info',
                actions: [{
                    label: 'Yes',
                    focus: true,
                    callback: _ => {
                        ipcRenderer.send('delete-items', items);
                        ipcRenderer.once('delete-status', (e, deleted) => {
                            if (deleted) {
                                this.refresh();
                                this.resetDelete();
                            }
                        });
                    }
                }, {
                    label: 'No',
                    callback: _ => {
                        this.resetDelete();
                    }
                }]
            });
        },

        resetDelete() {
            this.closeAlert('delete');
        }
    },

    created() {
        if (!instances.includes(this)) {
            instances.push(this);
        }
    }

};


module.exports = ActionsMixin;
