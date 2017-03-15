<template>
    <header class="app-header">
        <path-segments :path="path"></path-segments>
    </header>
</template>


<style scoped>
    .app-header {
        background-color: var(--panel-primary-color);
    }
</style>


<script>
    module.exports = {
        name: 'app-header',
        props: ['path'],

        components: {
            'path-segments': require('./path-segments.vue')
        }
    };
</script>
