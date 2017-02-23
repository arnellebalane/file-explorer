((global, factory) => {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    global.HistoryMixin = factory();
  }
})(this, () => {

  const HistoryMixin = {

    data: {
      history: [],
      historyIndex: -1
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
          this.$emit('historychange', this.history[--this.historyIndex]);
        }
      },

      forward() {
        if (this.historyIndex < this.history.length - 1) {
          this.$emit('historychange', this.history[++this.historyIndex]);
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


  return HistoryMixin;

});
