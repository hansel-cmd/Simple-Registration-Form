import router from "./router";
import App from "./App.vue";    
import store from "./services/store/modules";

require('./bootstrap');

window.Vue = require('vue').default;


router.beforeEach((to, from, next) => {
    
    console.log("test");
    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
