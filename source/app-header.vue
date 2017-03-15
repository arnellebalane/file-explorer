<template>
    <header class="app-header">
        <path-segments :path="path" :open="open"></path-segments>
    </header>
</template>


<script>
    module.exports = {
        name: 'app-header',
        props: ['path', 'open'],

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
