<template>
    <main class="directory-contents">
        <div class="directory-contents-wrapper">
            <new-folder v-if="creatingNewFolder"></new-folder>
            <directory-item v-for="item in items"
                :key="item.path"
                :item="item"
                :selected="selected(item.path)"
                :visible="visible(item)"
                @dblclick="open(item.path)"
                @mousedown="select">
            </directory-item>
        </div>
    </main>
</template>


<script>
    const { mapState } = require('vuex');

    module.exports = {
        name: 'directory-contents',

        mixins: [
            require('../mixins/directory'),
            require('../mixins/selection')
        ],

        computed: mapState(['items', 'showHiddenFiles', 'creatingNewFolder']),

        methods: {
            visible(item) {
                return (!this.showHiddenFiles && item.name[0] !== '.')
                    || this.showHiddenFiles;
            }
        },

        components: {
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
</style>
