import router from "./router";
import App from "./App.vue";    
import store from "./services/store/modules";
import { ACTION_VERIFY_AUTH, GETTER_USER } from "./services/store/types/authStore";

require('./bootstrap');

window.Vue = require('vue').default;


router.beforeEach((to, from, next) => {
    
    // Ensure we checked auth before each page load.
    Promise.all([store.dispatch(ACTION_VERIFY_AUTH)])
    .then(data => {
        
        console.log(data)
        if (to.name == "home" || to.name == "account" || to.name == "posts") {
            if (data[0]) {
                next();
            } else {
                console.log("else go back to login");
                next({name: "login"});
            }
            return;
        }

        if (to.name == "login" || to.name == "register" || to.name == "index") {
            if (data[0]) {
                next({name: "home"});
            } else {
                next();
            }
            return;
        }

        next();
 
    });
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
