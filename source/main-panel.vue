<template>
    <main class="main-panel">
        <app-header :path="path"></app-header>
        <directory-contents :path="path"></directory-contents>
    </main>
</template>


<script>
    module.exports = {
        name: 'main-panel',
        props: ['path'],

        components: {
            'app-header': require('./app-header.vue'),
            'directory-contents': require('./directory-contents.vue')
        }
    };
</script>
