<template>
    <div id="app">
        <sidebar-panel></sidebar-panel>
        <main-panel :path="path"></main-panel>
    </div>
</template>


<style src="./assets/stylesheets/fonts.css"></style>
<style src="./assets/stylesheets/global.css"></style>
<style scoped>
    #app {
        display: flex;
        height: 100%;
        background-color: var(--panel-secondary-color);
    }

    /**
     *  It seems like the `sidebar-panel` and `main-panel` components cannot be
     *  styled here, so I am styling the root element inside these respective
     *  components.
     *  NOTE: Find way to style the components directly (i.e. using type
     *  selector to style them instead of targetting elements that they are
     *  abstracting away).
     **/
    .sidebar-panel {
        flex: 0 0 auto;
    }

    .main-panel {
        flex-grow: 1;
    }
</style>


<script>
    module.exports = {
        name: 'app',

        data() {
            return {
                path: require('user-home') || '/'
            };
        },

        components: {
            'sidebar-panel': require('./sidebar-panel.vue'),
            'main-panel': require('./main-panel.vue')
        }
    };
</script>
