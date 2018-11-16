import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';

router.afterEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
        store.commit('setPath', to.fullPath);
        store.dispatch('openPath', to.fullPath);
    }
});

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
