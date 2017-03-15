<template>
    <main class="main-panel">
        <app-header :path="path"></app-header>
    </main>
</template>


<script>
    module.exports = {
        name: 'main-panel',
        props: ['path'],

        components: {
            'app-header': require('./app-header.vue')
        }
    };
</script>
