<template>
    <p class="alert-message" :class="type">
        <span class="message">{{ message }}</span>
    </p>
</template>


<script>
    module.exports = {
        name: 'alert-message',
        props: ['message', 'type']
    };
</script>


<style scoped>
    p {
        padding: 0 0 0 1.25em;
        position: fixed;
        top: 5rem;
        left: 25rem;
        right: 0;
    }

    p.success {
        color: #085328;
        background-color: #72efa8;
    }

    p.info {
        color: #0d3552;
        background-color: #80cbff;
    }

    p.error {
        color: #6f1313;
        background-color: #e66d6d;
    }

    span {
        line-height: 2.4rem;
    }
</style>
