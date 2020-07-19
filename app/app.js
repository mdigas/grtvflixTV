import Vue from "nativescript-vue";
import App from "./components/App";
import router from './routes'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = (TNS_ENV === 'production');
Vue.config.silent = false;

Vue.prototype.$router = router
Vue.prototype.$showDetails = {value: 1};

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}

new Vue({
    render: h => h(App)
}).$start();

//new Vue({
//    render: h => h('frame', [h(App)]),
//}).$start();
