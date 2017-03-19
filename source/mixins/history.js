module.exports = {
    data() {
        return {
            history: [],
            historyIndex: -1
        };
    },

    methods: {
        push(value) {
            if (this.history[this.historyIndex] !== value) {
                this.historyIndex++;
                this.history.splice(this.historyIndex, this.history.length, value);
            }
        },

        back() {
            if (this.historyIndex > 0) {
                this.open(this.history[--this.historyIndex]);
            }
        },

        forward() {
            if (this.historyIndex < this.history.length - 1) {
                this.open(this.history[++this.historyIndex]);
            }
        }
    }
};
