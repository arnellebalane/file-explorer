function selectionKeyboard(component, e) {
    const items = component.$store.getters.items;
    const selection = component.selection;
    const selectionStart = component.selectionStart;

    // TODO: make this responsive
    const ROW_ITEMS_COUNT = 5;
    let index = null;

    const ref = selection[0] === selectionStart ? selection.length - 1 : 0;
    const i = items.findIndex(item => item.path === selection[ref]);

    if (e.code === 'ArrowLeft') {
        index = i > 0 ? i - 1 : index;
    } else if (e.code === 'ArrowRight') {
        index = i < items.length - 1 ? i + 1 : index;
    } else if (e.code === 'ArrowUp') {
        index = i >= ROW_ITEMS_COUNT ? i - ROW_ITEMS_COUNT : index;
    } else if (e.code === 'ArrowDown') {
        index = i < items.length - ROW_ITEMS_COUNT ? i + ROW_ITEMS_COUNT : index;
    } else if (e.code === 'Home') {
        index = 0;
    } else if (e.code === 'End') {
        index = items.length - 1;
    }

    if (index !== null) {
        /*
         * So that the directory contents panel does not scroll up or down when
         * pressing ArrowUp or ArrowDown during selection.
         */
        e.preventDefault();

        const item = items[index];
        component.select(item.path, e);
    }
}

function selectionDefault(component, itemPath) {
    component.selection = [itemPath];
    component.selectionStart = itemPath;
}

function selectionCtrl(component, itemPath) {
    if (component.selection.length === 0) {
        selectionDefault(component, itemPath);
    } else if (!component.selection.includes(itemPath)) {
        component.selection.push(itemPath);
    }
}

function selectionShift(component, itemPath) {
    if (component.selection.length === 0) {
        selectionDefault(component, itemPath);
    } else {
        const items = component.$store.getters.items;
        let start = items.findIndex(item => item.path === component.selectionStart);
        let end = items.findIndex(item => item.path === itemPath);
        [start, end] = [Math.min(start, end), Math.max(start, end)];
        component.selection = items.slice(start, end + 1).map(item => item.path);
    }
}

export default {
    data() {
        return {
            selection: [],
            selectionStart: null
        };
    },

    methods: {
        select(itemPath, e) {
            if (e.ctrlKey) {
                selectionCtrl(this, itemPath);
            } else if (e.shiftKey) {
                selectionShift(this, itemPath);
            } else {
                selectionDefault(this, itemPath);
            }
        },

        selected(itemPath) {
            return this.selection.includes(itemPath);
        },

        clearSelection() {
            this.selection = [];
            this.selectionStart = null;
        },

        _handleDocumentKeydown(e) {
            selectionKeyboard(this, e);
        }
    },

    watch: {
        selection() {
            this.$store.commit('setSelection', this.selection);
        }
    },

    created() {
        document.addEventListener('keydown', this._handleDocumentKeydown);
        document.addEventListener('mousedown', this.clearSelection);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this._handleDocumentKeydown);
        document.removeEventListener('mousedown', this.clearSelection);
    }
};
