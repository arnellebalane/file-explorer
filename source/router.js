import Vue from 'vue';
import VueRouter from 'vue-router';
import FileSystem from './views/FileSystem.vue';

Vue.use(VueRouter);

const routes = [{
    path: '*',
    component: FileSystem
}];

export default new VueRouter({routes});
