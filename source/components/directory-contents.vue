<template>
    <main class="directory-contents">
        <div class="directory-contents-wrapper">
            <directory-item v-for="item in items"
                :key="item.path"
                :item="item"
                :selected="selected(item.path)"
                :visible="visible(item)"
                @dblclick="open"
                @mousedown="select">
            </directory-item>
        </div>
    </main>
</template>


<script>
    const { ipcRenderer } = require('electron');

    module.exports = {
        name: 'directory-contents',
        props: ['path'],

        mixins: [
            require('../mixins/directory'),
            require('../mixins/selection')
        ],

        data() {
            return {
                items: []
            };
        },

        methods: {
            visible() {
                return true;
            },

            readdir(path) {
                ipcRenderer.send('read-path', path);
            }
        },

        watch: {
            path() {
                this.readdir(this.path);
            }
        },

        components: {
            'directory-item': require('./directory-item.vue')
        },

        created() {
            ipcRenderer.on('fs-data', (e, files) => this.items = files);
            this.readdir(this.path);
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
