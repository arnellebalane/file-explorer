<template>
    <main class="main-panel">
        <AppHeader />
        <DirectoryContents />
    </main>
</template>


<script>
import AppHeader from './AppHeader.vue';
import DirectoryContents from './DirectoryContents.vue';

export default {
    name: 'MainPanel',

    components: {
        AppHeader,
        DirectoryContents
    }
};
</script>


<style scoped>
.main-panel {
    display: flex;
    flex-direction: column;
}

.app-header {
    flex-shrink: 0;
}

.directory-contents {
    flex-grow: 1;
}
</style>
