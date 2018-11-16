<template>
    <section class="sidebar-list">
        <h1 class="list-title">{{ title }}</h1>
        <nav class="list-items">
            <!-- https://github.com/vuejs/vue-router/issues/2356 -->
            <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
            <router-link
                v-for="item in items"
                :key="item.path"
                :to="item.path"
                class="list-item"
            >
                <i class="icon icon--directory"></i>
                {{ item.name }}
            </router-link>
        </nav>
    </section>
</template>

<script>
export default {
    name: 'SidebarList',

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
