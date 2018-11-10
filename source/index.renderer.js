import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';

router.afterEach(to => {
    store.dispatch('openPath', to.fullPath);
});

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,

    watch: {
        '$store.state.path': {
            handler(path) {
                this.$router.push({path});
            },
            immediate: true
        }
    },

    render: h => h(App)
});
