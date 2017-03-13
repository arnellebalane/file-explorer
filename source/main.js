const Vue = require('vue').default;
const App = require('./app.vue');


new Vue({
    el: '#app',
    render: h => h(App)
});
