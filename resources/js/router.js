import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            redirect: '/login',
            component: () => import("./components/Index.vue"),
            meta: { title: "index" }
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
            path: "/verification",
            name: "verification",
            component: () => import("./components/VerificationMessage.vue"),
            meta: { title: "Verification" }
        },
        {
            path: "/auth",
            name: "auth",
            redirect: "/verification"
        },
        {
            path: "/home",
            name: "home",
            redirect: "/account",
            component: () => import("./components/home/HomeComponent.vue"),
            meta: { title: "Home Page" },
            children: [
                {
                    path: "/account",
                    name: "account",
                    component: () => import("./components/home/AccountComponent.vue"),
                    meta: { title: "Account" }
                },
                {
                    path: "/posts",
                    name: "posts",
                    component: () => import("./components/home/PostsComponent.vue"),
                    meta: { title: "Public Posts" }
                },
            ]
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