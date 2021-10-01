import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "./authStore.js";
import PostStore from "./postStore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        AuthStore,
        PostStore
    }
});