<template>
    <div>
        <i class="icon item-icon icon--directory"></i>
        <input
            ref="input"
            v-model="name"
            type="text"
            autofocus
            @keydown.stop.enter="createNewFolder(name)"
            @keydown.stop.esc="cancelNewFolder"
            @blur="cancelNewFolder"
        >
    </div>
</template>

<script>
import path from 'path';
import {ipcRenderer} from 'electron';

export default {
    name: 'NewFolder',

    data() {
        return {
            name: ''
        };
    },

    mounted() {
        this.$refs.input.focus();
    },

    methods: {
        createNewFolder(folderName) {
            if (!folderName.trim()) {
                return;
            }

            const directory = path.join(this.$store.state.path, folderName);

            ipcRenderer.send('create-directory', directory);
            ipcRenderer.once('create-directory-response', (e, response) => {
                if (response === true) {
                    this.cancelNewFolder();
                    this.$store.dispatch('refreshPath');
                } else if (response.code === 'EEXIST') {
                    this.$store.commit('setError', {
                        message: `Name "${folderName}" already exists.`,
                        type: 'error'
                    });
                }
            });
        },

        cancelNewFolder() {
            this.name = '';
            this.$store.commit('setError', null);
            this.$store.commit('setCreatingNewFolder', false);
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
