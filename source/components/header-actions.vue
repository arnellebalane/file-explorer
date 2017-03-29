<template>
    <header class="header-actions">
        <button class="btn btn--back" :disabled="backHeaderActionDisabled" @click="back"></button>
        <button class="btn btn--forward" :disabled="forwardHeaderActionDisabled" @click="forward"></button>
        <button class="btn btn--refresh" @click="refresh"></button>
        <button class="btn btn--add-folder"></button>
        <button class="btn btn--visible"></button>
    </header>
</template>


<script>
    const { mapState } = require('vuex');

    module.exports = {
        name: 'header-actions',
        computed: mapState(['path']),

        mixins: [
            require('../mixins/directory'),
            require('../mixins/history')
        ],

        watch: {
            path() {
                this.push(this.path);
            }
        },

        created() {
            this.push(this.path);
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
