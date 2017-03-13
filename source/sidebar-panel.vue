<template>
    <aside class="sidebar-panel">
        <header-actions></header-actions>
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

        components: {
            'header-actions': require('./header-actions.vue')
        }
    };
</script>
