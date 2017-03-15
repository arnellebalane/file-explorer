const Vue = require('vue').default;
const App = require('./components/app.vue');


new Vue({
    el: '#app',
    render: h => h(App)
});
