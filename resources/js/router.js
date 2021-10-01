import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./components/Index.vue"),
            meta: { title: "Index" }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/LogInComponent.vue"),
            meta: { title: "Log In" }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./components/RegisterComponent.vue"),
            meta: { title: "Register" }
        },
        {
            path: "/auth",
            name: "auth",
            redirect: "/login"
          },
        {
            path: "*",
            redirect: "/404"
        },
        {
            path: "/404",
            name: "404",
            component: () => import("./components/ErrorComponent.vue")
        },
    ]
});