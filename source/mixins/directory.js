module.exports = {
    methods: {
        open(path) {
            this.$store.dispatch('openPath', path);
        }
    }
};
