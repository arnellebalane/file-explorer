<template>
    <div id="app">
        <app-header></app-header>
    </div>
</template>


<style src="./assets/stylesheets/base.css"></style>
<style scoped>
    #app {
        height: 100%;
    }
</style>


<script>
    module.exports = {
        name: 'app',

        components: {
            'app-header': require('./app-header.vue')
        }
    };
</script>
