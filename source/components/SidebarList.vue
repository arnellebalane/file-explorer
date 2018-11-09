<template>
    <section class="sidebar-list">
        <h1 class="list-title">{{ title }}</h1>
        <nav class="list-items">
            <a
                v-for="item in items"
                :key="item.path"
                :href="item.path"
                class="list-item"
                @click.prevent="open(item.path)"
            >
                <i class="icon icon--directory"></i>
                {{ item.name }}
            </a>
        </nav>
    </section>
</template>

<script>
import ActionsMixin from '../mixins/actions';

export default {
    name: 'SidebarList',

    mixins: [
        ActionsMixin
    ],

    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            default: () => []
        }
    }
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
