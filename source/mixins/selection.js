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
        }
    }
}
