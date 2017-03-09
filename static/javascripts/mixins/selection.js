const DisplayMixin = require('./display');
const keyCodes = require('../utils/keycodes');


const instances = [];


/**
 *  Identifies the new item that will be added to the selection based on the
 *  keyboard keys pressed. The actual selection is delegated to other functions
 *  that perform specific selection logic.
 *  @param {Vue} app The Vue instance to perform the selection to.
 *  @param {KeyboardEvent} e
 **/
function selectionKeyboard(app, e) {
    const items = app.items.filter(item => app.visible(item));
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
        app.select(item.path, e);
    }
}


/**
 *  Performs selection when the Control key is pressed. This allows multiple
 *  items to be selected.
 *  @param {Vue} app The Vue instance to perform the selection to.
 *  @param {String} itempath The path to the new item that is going to be added
 *    to the selection.
 **/
function selectionCtrl(app, itempath) {
    app.selection.push(itempath);
    if (app.selection.length === 1) {
        app.selectionStart = itempath;
    }
}


/**
 *  Performs selection when the Shift key is pressed. This allows multiple
 *  items to be selected. This selects the items in the range of the first item
 *  in the selection to the new item to be added to the selection, inclusively.
 *  @param {Vue} app The Vue instance to perform the selection to.
 *  @param {String} itempath The path to the new item that is going to be added
 *    to the selection.
 **/
function selectionShift(app, itempath) {
    if (app.selection.length === 0) {
        selectionDefault(app, itempath);
    } else {
        let start = app.items.findIndex(item => item.path === app.selectionStart);
        let end = app.items.findIndex(item => item.path === itempath);
        [start, end] = [Math.min(start, end), Math.max(start, end)];
        app.selection = app.items.slice(start, end + 1)
            .filter(item => app.visible(item))
            .map(item => item.path);
    }
}


/**
 *  Performs the default selection behavior, where only one item is being
 *  selected at a time.
 *  @param {Vue} app The Vue instance to perform the selection to.
 *  @param {String} itempath The path to the new item that will be selected.
 **/
function selectionDefault(app, itempath) {
    app.selection = [itempath];
    app.selectionStart = itempath;
}


document.addEventListener('keydown', e => {
    instances.forEach(app => selectionKeyboard(app, e));
});

document.addEventListener('mousedown', e => {
    instances.forEach(app => app.clearSelection());
});


const SelectionMixin = {

    mixins: [
        DisplayMixin
    ],

    data: {
        items: [],
        selection: [],
        selectionStart: ''
    },

    methods: {
        /**
         *  Handles request to select an item. Delegates the task to perform
         *  the the actual selection to specific functions based on what type
         *  of selection should be done.
         *  @param {String} itempath The path to the new item that is going to
         *      be selected or added to current selection.
         *  @param {Event} e
         **/
        select(itempath, e={}) {
            if (e.ctrlKey) {
                selectionCtrl(this, itempath);
            } else if (e.shiftKey) {
                selectionShift(this, itempath);
            } else {
                selectionDefault(this, itempath);
            }
        },

        /**
         *  Determines whether an item is part of the current selection or not.
         *  @param {String} itempath The path to the item to be checked.
         *  @return {Boolean} Whether the item is part of the selection or not.
         **/
        selected(itempath) {
            return this.selection.includes(itempath);
        },

        clearSelection() {
            this.selection = [];
            this.selectionStart = '';
        }
    },

    created() {
        instances.push(this);
    }

};


module.exports = SelectionMixin;
