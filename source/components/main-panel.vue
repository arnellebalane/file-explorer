<template>
    <main class="main-panel">
        <app-header></app-header>
        <directory-contents></directory-contents>
    </main>
</template>


<script>
    module.exports = {
        name: 'main-panel',

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
