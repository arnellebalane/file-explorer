<template>
    <main class="directory-contents">
        <directory-item
            v-for="item in items"
            :key="item.path"
            :item="item"
            :selected="selected(item)"
            :visible="visible(item)">
        </directory-item>
    </main>
</template>


<style>
    .directory-contents {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5em;
        --columns: 5;
    }
</style>


<script>
    const { ipcRenderer } = require('electron');

    module.exports = {
        name: 'directory-contents',
        props: ['path'],

        data() {
            return {
                items: [
                    { type: 'directory', name: 'home', path: '/home' },
                    { type: 'file', name: 'home', path: '/home' }
                ]
            };
        },

        methods: {
            selected() {
                return false;
            },

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
