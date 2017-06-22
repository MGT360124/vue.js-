// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口js
// el是app.vue的挂载点.
import Vue from 'vue';
// 引入vue-router和vue-resource
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
// 引入组件
import goods from './components/goods/goods.vue';
import seller from './components/seller/seller.vue';
import ratings from './components/ratings/ratings.vue';
import './common/styles/index.styl';
Vue.config.productionTip = false;
// 全局安装路由功能
Vue.use(VueRouter);
// 全局都可使用vueResource
Vue.use(VueResource);
/* eslint-disable no-new */
// 每个路由映射一个组件
const routes = [
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings }
];
// 创建router实例，然后传入routes配置
const router = new VueRouter({
  routes,
  linkActiveClass:'active'
});
//  创建和挂载根实例。 
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能 
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
// router.go('/goods');
