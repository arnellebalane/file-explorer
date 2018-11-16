<template>
    <main class="file-system">
        <AppHeader />
        <DirectoryContents />
    </main>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import DirectoryContents from '../components/DirectoryContents.vue';

export default {
    name: 'FileSystem',

    components: {
        AppHeader,
        DirectoryContents
    }
};
</script>

<style scoped>
.file-system {
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
