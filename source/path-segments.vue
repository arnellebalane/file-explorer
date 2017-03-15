<template>
    <nav class="path-segments">
        <a class="path-segment" href="/">root</a>
        <a class="path-segment" :href="segment.path" v-for="segment in segments">{{segment.name}}</a>
        <span class="path-segment" v-if="!isRootDirectory">{{currentDirectory}}</span>
    </nav>
</template>


<style scoped>
    .path-segments {
        display: flex;
        padding: 1rem;
    }

    .path-segment {
        padding: 2px 0.75rem 0 0.75rem;
        line-height: 2.4rem;
    }

    .path-segment:first-child {
        font-size: 1rem;
        font-weight: bold;
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


<script>
    module.exports = {
        name: 'path-segments',
        props: ['path'],

        computed: {
            segments() {
                let segments = this.path.split('/');
                return segments.slice(1, segments.length - 1).map((segment, i, array) => {
                    return {
                        name: segment,
                        path: '/' + array.slice(0, i + 1).join('/')
                    };
                });
            },

            currentDirectory() {
                return this.path.split('/').pop() || '/';
            },

            isRootDirectory() {
                return this.currentDirectory === '/';
            }
        }
    };
</script>
