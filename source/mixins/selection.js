function selectionKeyboard(app, e) {
    const items = app.items.filter(item => app.visible(item));
    const selection = app.selection;
    const selectionStart = app.selectionStart;
    const ROW_ITEMS_COUNT = 5; // TODO: make this responsive
    let index = null;

    const ref = selection[0] === selectionStart ? selection.length - 1 : 0;
    const i = items.findIndex(item => item.path === selection[ref]);

    if (e.key === 'ArrowLeft') {
        index = i > 0 ? i - 1 : index;
    } else if (e.key === 'ArrowRight') {
        index = i < items.length - 1 ? i + 1 : index;
    } else if (e.key === 'ArrowUp') {
        index = i >= ROW_ITEMS_COUNT ? i - ROW_ITEMS_COUNT : index;
    } else if (e.key === 'ArrowDown') {
        index = i < items.length - ROW_ITEMS_COUNT ? i + ROW_ITEMS_COUNT : index;
    } else if (e.key === 'Home') {
        index = 0;
    } else if (e.key === 'End') {
        index = items.length - 1;
    }

    if (index != null) {
        const item = items[index];
        app.select(item.path, e);
    }
}


function selectionCtrl(app, itempath) {
    if (app.selection.length === 0) {
        selectionDefault(app, itempath);
    } else if (!app.selection.includes(itempath)) {
        app.selection.push(itempath);
    }
}


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


function selectionDefault(app, itempath) {
    app.selection = [itempath];
    app.selectionStart = itempath;
}


module.exports = {
    data() {
        return {
            selection: [],
            selectionStart: null
        };
    },

    methods: {
        select(itempath, e) {
            if (e.ctrlKey) {
                selectionCtrl(this, itempath);
            } else if (e.shiftKey) {
                selectionShift(this, itempath);
            } else {
                selectionDefault(this, itempath);
            }
        },

        selected(itempath) {
            return this.selection.includes(itempath);
        },

        _handleDocumentKeydown(e) {
            e.preventDefault();
            selectionKeyboard(this, e);
        }
    },

    created() {
        document.addEventListener('keydown', this._handleDocumentKeydown);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this._handleDocumentKeydown);
    }
}
