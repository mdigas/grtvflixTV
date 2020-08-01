import Vue from "nativescript-vue";
import App from "./components/App";
import router from './routes'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = (TNS_ENV === 'production');
Vue.config.silent = false;

Vue.prototype.$router = router

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}

const platformModule = require("tns-core-modules/platform");
const screenwidth = platformModule.screen.mainScreen.widthPixels;
console.log(screenwidth);
Vue.prototype.$width = screenwidth;
if(screenwidth>1920){
    Vue.prototype.$width = 3840;
}

new Vue({
    render: h => h(App)
}).$start();

//new Vue({
//    render: h => h('frame', [h(App)]),
//}).$start();
