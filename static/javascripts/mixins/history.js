/**
 *  Vue mixin to handle history management. Provides methods for convenient
 *  addition of and navigation between history entries.
 **/
const HistoryMixin = {

    data: {
        path: '',
        history: [],
        historyIndex: -1
    },

    methods: {
        /**
         *  Adds a new entry to the history stack, making sure that no similar
         *  history entries are added next to each other. The new entry will always
         *  end up being the last entry in the history, removing any entries after
         *  it if it is attempted to be inserted at the middle of the history
         *  stack.
         *  @param {String} value The new entry that is requested to be added to
         *    the history stack.
         **/
        push(value) {
            if (this.history[this.historyIndex] !== value) {
                this.historyIndex++;
                this.history.splice(this.historyIndex, this.history.length, value);
            }
        },

        /**
         *  Moves back to the previous entry in history if it is not at the
         *  beginning of the history stack yet.
         **/
        back() {
            if (this.historyIndex > 0) {
                this.path = this.history[--this.historyIndex];
            }
        },

        /**
         *  Moves forward to the next entry in history if it is not at the end of
         *  the history stack yet.
         **/
        forward() {
            if (this.historyIndex < this.history.length - 1) {
                this.path = this.history[++this.historyIndex];
            }
        }
    },

    watch: {
        historyIndex() {
            this.$emit('historyindexchange', {
                first: this.historyIndex === 0,
                last: this.historyIndex === this.history.length - 1
            });
        }
    }

};


module.exports = HistoryMixin;
