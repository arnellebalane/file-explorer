// `vue` is required with a `.default` at the end to work around how Babel
// transpiles ES6 default exports. Normally this imported using ES6 imports,
// but I wanted to stick with using require.
const Vue = require('vue').default;
const App = require('./components/app.vue');
const store = require('./store');


new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
});
