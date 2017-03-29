<template>
    <div>
        <i class="icon item-icon icon--directory"></i>
        <input type="text" autofocus
            v-model="name"
            @keydown.stop.enter="createNewFolder(name)"
            @keydown.stop.escape="cancelNewFolder"
            @blur="cancelNewFolder">
    </div>
</template>


<script>
    const path = require('path');
    const { ipcRenderer } = require('electron');
    const { mapState } = require('vuex');

    module.exports = {
        data() {
            return {
                name: ''
            }
        },

        computed: mapState(['path']),

        methods: {
            createNewFolder(name) {
                if (!name.trim()) {
                    return false;
                }
                const directory = path.join(this.path, name);
                ipcRenderer.send('create-directory', directory);
                ipcRenderer.once('create-directory-response', (e, response) => {
                    if (response === true) {
                        this.cancelNewFolder();
                    } else {
                        // show error
                    }
                });
            },

            cancelNewFolder() {
                this.name = '';
            }
        }
    };
</script>


<style scoped>
    div {
        width: calc((100% - var(--columns) * 0.5rem) / var(--columns));
        display: flex;
        align-items: center;
        padding: 0.5rem;
        margin: 0.25rem;
        background-color: var(--panel-secondary-highlight-color);
        border-radius: 0.3rem;
    }

    .item-icon {
        flex-shrink: 0;
        margin-right: 0.5rem;
        font-size: 3.2rem;
    }

    input {
        width: calc(100% - 1em);
        border: none;
        background-color: transparent;
    }
</style>
