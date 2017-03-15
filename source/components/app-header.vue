<template>
    <header class="app-header">
        <path-segments :path="path"></path-segments>
    </header>
</template>


<script>
    module.exports = {
        name: 'app-header',

        computed: {
            path() {
                return this.$store.state.path;
            }
        },

        components: {
            'path-segments': require('./path-segments.vue')
        }
    };
</script>


<style scoped>
    .app-header {
        display: flex;
        height: 5rem;
        background-color: var(--panel-primary-color);
    }
</style>
