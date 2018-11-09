<template>
    <aside class="sidebar-panel">
        <HeaderActions />
        <SidebarList :title="places.title" :items="places.items" />
    </aside>
</template>


<script>
import userHome from 'user-home';
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
                    {name: 'Documents', path: `${userHome}/Documents`},
                    {name: 'Downloads', path: `${userHome}/Downloads`},
                    {name: 'Desktop', path: `${userHome}/Desktop`},
                    {name: 'Pictures', path: `${userHome}/Pictures`}
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
