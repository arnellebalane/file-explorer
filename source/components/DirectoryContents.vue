<template>
    <main class="directory-contents">
        <AlertMessage v-if="error" :message="error.message" :type="error.type" />

        <div class="directory-contents-wrapper">
            <NewFolder v-if="creatingNewFolder" />
            <DirectoryItem
                v-for="item in items"
                :key="item.path"
                :item="item"
                :selected="selected(item.path)"
                :visible="visible(item)"
                @dblclick="open(item.path)"
                @mousedown="select"
            />
        </div>
    </main>
</template>

<script>
import {mapState} from 'vuex';
import AlertMessage from './AlertMessage.vue';
import DirectoryItem from './DirectoryItem.vue';
import NewFolder from './NewFolder.vue';
import ActionsMixin from '../mixins/actions';
import SelectionMixin from '../mixins/selection';

export default {
    name: 'DirectoryContents',

    components: {
        AlertMessage,
        DirectoryItem,
        NewFolder
    },

    mixins: [
        ActionsMixin,
        SelectionMixin
    ],

    computed: mapState([
        'items',
        'showHiddenFiles',
        'creatingNewFolder',
        'error'
    ]),

    methods: {
        visible(item) {
            return (!this.showHiddenFiles && item.name[0] !== '.')
                || this.showHiddenFiles;
        }
    }
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
