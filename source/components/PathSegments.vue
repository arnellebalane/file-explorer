<template>
    <nav class="path-segments">
        <!-- https://github.com/vuejs/vue-router/issues/2356 -->
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-link to="/" class="path-segment">root</router-link>

        <!-- https://github.com/vuejs/vue-router/issues/2356 -->
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-link
            v-for="segment in segments"
            :key="segment.path"
            :to="segment.path"
            class="path-segment"
        >
            {{ segment.name }}
        </router-link>
        <span
            v-if="!isRootDirectory"
            class="path-segment"
        >
            {{ currentDirectory }}
        </span>
    </nav>
</template>

<script>
export default {
    name: 'PathSegments',

    computed: {
        segments() {
            const segments = this.$store.state.path.split('/');
            return segments.slice(1, segments.length - 1).map((segment, i, array) => ({
                name: segment,
                path: `/${array.slice(0, i + 1).join('/')}`
            }));
        },

        currentDirectory() {
            return this.$store.state.path.split('/').pop() || '/';
        },

        isRootDirectory() {
            return this.currentDirectory === '/';
        }
    }
};
</script>

<style scoped>
.path-segments {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.path-segment {
    padding: 2px 0.75rem 0;
    line-height: 2.4rem;
}

.path-segment:first-child {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
}

a.path-segment {
    margin-right: 0.5rem;
    position: relative;
    border-radius: 0.3rem;
}

a.path-segment:hover,
a.path-segment:focus {
    background-color: var(--panel-primary-highlight-color);
}

a.path-segment:not(:last-child)::after {
    content: "/";
    position: absolute;
    top: calc(50% - 1.2rem);
    right: -0.5rem;
    width: 0.5rem;
    padding-top: 1px;
    font-size: 0.8rem;
    text-align: center;
    line-height: 2.4rem;
    opacity: 0.5;
}

a.path-segment:first-child:last-child,
span.path-segment {
    color: var(--text-highlight-color);
}
</style>
