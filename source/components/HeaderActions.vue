<template>
    <header class="header-actions">
        <button
            class="btn btn--back"
            @click="$router.back()"
        >
        </button>
        <button
            class="btn btn--forward"
            @click="$router.forward()"
        >
        </button>
        <button
            class="btn btn--refresh"
            @click="$store.dispatch('refreshPath')"
        >
        </button>
        <button
            class="btn btn--add-folder"
            @click="createNewFolder"
        >
        </button>
        <button
            class="btn"
            :class="toggleHiddenFilesClass"
            @click="$store.commit('toggleHiddenFiles')"
        >
        </button>
    </header>
</template>

<script>

export default {
    name: 'HeaderActions',

    computed: {
        toggleHiddenFilesClass() {
            return this.$store.state.showHiddenFiles
                ? 'btn--visible'
                : 'btn--invisible';
        }
    },

    methods: {
        createNewFolder() {
            this.$store.commit('setCreatingNewFolder', true);
        }
    }
};
</script>

<style scoped>
.header-actions {
    display: flex;
    padding: 1rem;
}

.btn {
    width: 3rem;
    height: 3rem;
    border: none;
    background: center center no-repeat;
    background-size: 1.6rem 1.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
    outline: none;
}

.btn:hover,
.btn:focus {
    background-color: var(--panel-primary-highlight-color);
}

.btn[disabled] {
    opacity: 0.25;
    pointer-events: none;
}

.btn--back { background-image: url("../assets/images/back.png"); }
.btn--forward { background-image: url("../assets/images/forward.png"); }
.btn--refresh { background-image: url("../assets/images/refresh.png"); }
.btn--add-folder { background-image: url("../assets/images/add-folder.png"); }
.btn--visible { background-image: url("../assets/images/visible.png"); }
.btn--invisible { background-image: url("../assets/images/invisible.png"); }
</style>
