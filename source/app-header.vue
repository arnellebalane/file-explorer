<template>
    <header class="app-header">
        <aside class="header-actions">
            <button class="btn btn--back"></button>
            <button class="btn btn--forward"></button>
            <button class="btn btn--refresh"></button>
            <button class="btn btn--add-folder"></button>
            <button class="btn btn--visible"></button>
        </aside>
        <header class="path-segments-wrapper">
            <nav class="path-segments">
                <a class="path-segment" href="/">root</a>
                <a class="path-segment">home</a>
                <span class="path-segment">arnelle</span>
            </nav>
        </header>
    </header>
</template>


<style scoped>
    .app-header {
        display: flex;
        height: 5rem;
        background-color: var(--panel-primary-color);
    }

    .header-actions {
        flex: 0 0 auto;
        width: 25rem;
        background-color: var(--panel-primary-color);
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

    .btn--back { background-image: url("./assets/images/back.png"); }
    .btn--forward { background-image: url("./assets/images/forward.png"); }
    .btn--refresh { background-image: url("./assets/images/refresh.png"); }
    .btn--add-folder { background-image: url("./assets/images/add-folder.png"); }
    .btn--visible { background-image: url("./assets/images/visible.png"); }
    .btn--invisible { background-image: url("./assets/images/invisible.png"); }

    .path-segments-wrapper {
        flex-grow: 1;
        display: flex;
        align-items: center;
        position: relative;
        overflow: auto;
    }

</style>


<script>
    module.exports = {
        name: 'app-header'
    };
</script>
