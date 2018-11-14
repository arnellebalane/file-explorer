<template>
    <div id="app">
        <SidebarPanel />

        <!-- https://github.com/vuejs/vue-router/issues/2356 -->
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-view class="main-panel" />
    </div>
</template>

<script>
import userHome from 'user-home';
import SidebarPanel from './SidebarPanel.vue';

export default {
    name: 'App',

    components: {
        SidebarPanel
    },

    created() {
        this.$router.push({path: userHome});

        document.addEventListener('keydown', this.handleKeydown);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
    },

    methods: {
        handleKeydown(e) {
            if (e.code === 'Delete') {
                this.$store.dispatch('deleteSelection');
            }
        }
    }
};
</script>

<style src="../assets/stylesheets/fonts.css"></style>
<style src="../assets/stylesheets/global.css"></style>
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
