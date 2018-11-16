<template>
    <main class="directory-contents">
        <AlertMessage
            v-if="$store.state.error"
            :message="$store.state.error.message"
            :type="$store.state.error.type"
        />

        <div class="directory-contents-wrapper">
            <NewFolder v-if="$store.state.creatingNewFolder" />
            <DirectoryItem
                v-for="item in $store.getters.items"
                :key="item.path"
                :item="item"
                :selected="selected(item.path)"
                @dblclick="$router.push({path: item.path})"
                @mousedown="select"
            />
        </div>
    </main>
</template>

<script>
import AlertMessage from './AlertMessage.vue';
import DirectoryItem from './DirectoryItem.vue';
import NewFolder from './NewFolder.vue';
import SelectionMixin from '../mixins/selection';

export default {
    name: 'DirectoryContents',

    components: {
        AlertMessage,
        DirectoryItem,
        NewFolder
    },

    mixins: [
        SelectionMixin
    ]
};
</script>

<style scoped>
.directory-contents {
    overflow: auto;
}

.directory-contents-wrapper {
    --columns: 5;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5em;
}

.alert-message + .directory-contents-wrapper {
    margin-top: 2.4rem;
}
</style>
