<template>
    <main class="directory-contents">
        <AlertMessage v-if="errorMessage" :message="errorMessage" :type="errorType" />
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
    const {mapState} = require('vuex');

    module.exports = {
        name: 'directory-contents',

        mixins: [
            require('../mixins/actions'),
            require('../mixins/selection')
        ],

        computed: mapState(['items',
                            'showHiddenFiles',
        'creatingNewFolder',
        'errorMessage',
                            'errorType']),

        methods: {
            visible(item) {
                return (!this.showHiddenFiles && item.name[0] !== '.')
                    || this.showHiddenFiles;
            }
        },

        components: {
            'alert-message': require('./alert-message.vue'),
            'new-folder': require('./new-folder.vue'),
            'directory-item': require('./directory-item.vue')
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
