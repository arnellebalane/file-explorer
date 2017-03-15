<template>
    <a class="directory-item" :class="{selected: selected}" :href="item.path" tabindex="-1" v-if="visible" @click.prevent @dblclick.prevent="open(item.path)">
        <i class="icon item-icon" :class="iconClass"></i>
        <p class="item-name">{{item.name}}</p>
    </a>
</template>


<script>
    module.exports = {
        name: 'directory-item',
        props: ['item', 'selected', 'visible', 'open'],

        computed: {
            iconClass() {
                return 'icon--' + this.item.type;
            }
        }
    };
</script>


<style>
    .directory-item {
        width: calc((100% - var(--columns) * 0.5rem) / var(--columns));
        display: flex;
        align-items: center;
        padding: 0.5rem;
        margin: 0.25rem;
        border-radius: 0.3rem;
    }

    a.directory-item:hover,
    a.directory-item.selected {
        background-color: var(--panel-secondary-highlight-color);
    }

    .item-icon {
        flex-shrink: 0;
        margin-right: 0.5rem;
        font-size: 3.2rem;
    }

    .item-name {
        word-break: break-all;
    }
</style>
