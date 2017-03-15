<template>
    <main class="directory-contents">
        <div class="directory-contents-wrapper">
            <directory-item v-for="item in items"
                :key="item.path"
                :item="item"
                :selected="selected(item)"
                :visible="visible(item)"
                :open="open">
            </directory-item>
        </div>
    </main>
</template>


<script>
    const { ipcRenderer } = require('electron');

    module.exports = {
        name: 'directory-contents',
        props: ['path', 'items', 'open'],

        methods: {
            selected() {
                return false;
            },

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
