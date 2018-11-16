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
        const path = sessionStorage.getItem('path') || userHome;
        this.$router.push({path});

        document.addEventListener('keydown', this.handleKeydown);
    },

    destroyed() {
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

.sidebar-panel {
    flex-shrink: 0;
}

.main-panel {
    flex-grow: 1;
}
</style>
