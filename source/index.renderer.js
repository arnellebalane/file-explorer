import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
