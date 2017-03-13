<template>
    <aside class="sidebar-panel">
        <header-actions></header-actions>
        <sidebar-list :title="places.title" :items="places.items"></sidebar-list>
    </aside>
</template>


<style scoped>
    .sidebar-panel {
        width: 25rem;
        background-color: var(--panel-primary-color);
    }
</style>


<script>
    module.exports = {
        name: 'sidebar-panel',

        data() {
            return {
                places: {
                    title: 'Places',
                    items: [
                        { name: 'Documents', path: '/home/arnelle/Documents' },
                        { name: 'Downloads', path: '/home/arnelle/Downloads' },
                        { name: 'Desktop', path: '/home/arnelle/Desktop' },
                        { name: 'Pictures', path: '/home/arnelle/Pictures' }
                    ]
                }
            };
        },

        components: {
            'header-actions': require('./header-actions.vue'),
            'sidebar-list': require('./sidebar-list.vue')
        }
    };
</script>
