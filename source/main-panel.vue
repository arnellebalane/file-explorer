<template>
    <main class="main-panel">
        <app-header :path="path"></app-header>
        <directory-contents :path="path" :items="items"></directory-contents>
    </main>
</template>


<script>
    module.exports = {
        name: 'main-panel',
        props: ['path', 'items'],

        components: {
            'app-header': require('./app-header.vue'),
            'directory-contents': require('./directory-contents.vue')
        }
    };
</script>


<style scoped>
    .main-panel {
        display: flex;
        flex-direction: column;
    }

    .app-header {
        flex-shrink: 0;
    }

    .directory-contents {
        flex-grow: 1;
    }
</style>
