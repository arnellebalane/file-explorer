<template>
    <main class="directory-contents">
        <directory-item v-for="item in items" :item="item" :selected="selected(item)" :visible="visible(item)"></directory-item>
    </main>
</template>


<style>
    .directory-contents {
        display: flex;
        flex-wrap: wrap;
        padding: 0.5em;
        --columns: 5;
    }
</style>


<script>
    module.exports = {
        name: 'directory-contents',
        props: ['path'],

        data() {
            return {
                items: [
                    { type: 'directory', name: 'home', path: '/home' },
                    { type: 'file', name: 'home', path: '/home' }
                ]
            };
        },

        methods: {
            selected() {
                return false;
            },

            visible() {
                return true;
            }
        },

        components: {
            'directory-item': require('./directory-item.vue')
        }
    };
</script>
