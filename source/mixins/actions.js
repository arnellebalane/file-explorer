export default {
    methods: {
        open(path) {
            this.$store.dispatch('openPath', path);
        },

        refresh() {
            this.$store.dispatch('refreshPath');
        },

        delete() {
            this.$store.dispatch('deleteSelection');
        },

        alert(message, type='error') {
            this.$store.commit('setError', {message, type});
        },

        hideAlert() {
            this.$store.commit('setError', {});
        },

        toggleHiddenFiles() {
            this.$store.commit('toggleHiddenFiles');
        }
    }
};
