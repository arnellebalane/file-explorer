<template>
    <div id="app">
        <sidebar-panel></sidebar-panel>
        <main-panel :path="path" :items="items" :open="open"></main-panel>
    </div>
</template>


<script>
    module.exports = {
        name: 'app',

        mixins: [
            require('./mixins/directory')
        ],

        data() {
            return {
                path: require('user-home') || '/',
                items: []
            };
        },

        components: {
            'sidebar-panel': require('./sidebar-panel.vue'),
            'main-panel': require('./main-panel.vue')
        }
    };
</script>


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
        flex-shrink: 0;
    }

    .main-panel {
        flex-grow: 1;
    }
</style>
