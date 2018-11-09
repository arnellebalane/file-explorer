<template>
    <aside class="sidebar-panel">
        <HeaderActions />
        <SidebarList :title="places.title" :items="places.items" />
    </aside>
</template>


<script>
import HeaderActions from './HeaderActions.vue';
import SidebarList from './SidebarList.vue';

export default {
    name: 'SidebarPanel',

    components: {
        HeaderActions,
        SidebarList
    },

    data() {
        return {
            places: {
                title: 'Places',
                items: [
                    {name: 'Documents', path: '/home/arnelle/Documents'},
                    {name: 'Downloads', path: '/home/arnelle/Downloads'},
                    {name: 'Desktop', path: '/home/arnelle/Desktop'},
                    {name: 'Pictures', path: '/home/arnelle/Pictures'}
                ]
            }
        };
    }
};
</script>


<style scoped>
.sidebar-panel {
    width: 25rem;
    background-color: var(--panel-primary-color);
}
</style>
