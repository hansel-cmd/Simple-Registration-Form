import router from "./router";
import App from "./App.vue";    

require('./bootstrap');

window.Vue = require('vue').default;


router.beforeEach((to, from, next) => {
    
    console.log("test");
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
