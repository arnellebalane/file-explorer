module.exports = {
    methods: {
        open(path) {
            this.$store.dispatch('openPath', path);
        },

        refresh() {
            this.$store.dispatch('refreshPath');
        },

        toggleHiddenFiles() {
            this.$store.commit('toggleHiddenFiles');
        }
    }
};
