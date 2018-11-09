<template>
    <header class="app-header">
        <PathSegments />
    </header>
</template>


<script>
    module.exports = {
        name: 'app-header',

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
