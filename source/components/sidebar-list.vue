<template>
    <section class="sidebar-list">
        <h1 class="list-title">{{ title }}</h1>
        <nav class="list-items">
            <a
                v-for="item in items"
                class="list-item"
                :href="item.path"
                @click.prevent="open(item.path)"
            >
                <i class="icon icon--directory"></i>
                {{ item.name }}
            </a>
        </nav>
    </section>
</template>


<script>
    module.exports = {
        name: 'sidebar-list',
        props: ['title', 'items'],

        mixins: [
            require('../mixins/actions')
        ]
    };
</script>


<style scoped>
    .sidebar-list {
        padding: 2rem 0;
    }

    .list-title {
        padding: 0 2rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .list-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 2rem;
    }

    .list-item:hover,
    .list-item:focus {
        background-color: var(--panel-primary-highlight-color);
    }

    .icon {
        flex-shrink: 0;
        margin-right: 0.5rem;
        font-size: 1.6rem;
    }
</style>
