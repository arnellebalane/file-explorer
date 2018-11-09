<template>
    <header class="app-header">
        <PathSegments />
    </header>
</template>


<script>
import PathSegments from './PathSegments.vue';

export default {
    name: 'app-header',

    components: {
        PathSegments
    }
};
</script>


<style scoped>
.app-header {
    display: flex;
    height: 5rem;
    background-color: var(--panel-primary-color);
}
</style>
