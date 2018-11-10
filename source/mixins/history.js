export default {
    data() {
        return {
            history: [],
            historyIndex: -1
        };
    },

    computed: {
        backHeaderActionDisabled() {
            return this.historyIndex === 0;
        },

        forwardHeaderActionDisabled() {
            return this.historyIndex === this.history.length - 1;
        }
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
                this.$store.dispatch('openPath', this.history[--this.historyIndex]);
            }
        },

        forward() {
            if (this.historyIndex < this.history.length - 1) {
                this.$store.dispatch('openPath', this.history[++this.historyIndex]);
            }
        }
    }
};
