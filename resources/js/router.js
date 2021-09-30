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
            path: "/test",
            name: "test",
            component: () => import("./components/ExampleComponent.vue")
        }
    ]
});