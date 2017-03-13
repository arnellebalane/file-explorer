<template>
    <div id="app">
        <sidebar-panel></sidebar-panel>
    </div>
</template>


<style src="./assets/stylesheets/base.css"></style>
<style scoped>
    #app {
        display: flex;
        height: 100%;
        background-color: var(--panel-secondary-color);
    }

    sidebar-panel {
        flex: 0 0 auto;
    }
</style>


<script>
    module.exports = {
        name: 'app',

        components: {
            'sidebar-panel': require('./sidebar-panel.vue')
        }
    };
</script>
