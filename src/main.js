import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Import Component
import PermissionsFormComponent from './components/Admin/PermissionsFormComponent.vue'
import PermissionsTableComponent from './components/Page/PermissionsTableComponent.vue'
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(require('vue-moment'));

const routes = [
  {path: '/permissions-form/:id?/:action', name:'permissionForm', component: PermissionsFormComponent},
  {path: '/permissions-list', component: PermissionsTableComponent},
  {path: '/', component: PermissionsTableComponent}
];

const router = new VueRouter({
  routes,
  history
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

