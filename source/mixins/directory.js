module.exports = {
    methods: {
        open(path) {
            this.$store.commit('open', path);
        }
    }
};
