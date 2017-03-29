<template>
    <main class="directory-contents">
        <div class="directory-contents-wrapper">
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

        computed: mapState(['items']),

        methods: {
            visible() {
                return true;
            }
        },

        components: {
            'directory-item': require('./directory-item.vue')
        }
    };
</script>


<style>
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
