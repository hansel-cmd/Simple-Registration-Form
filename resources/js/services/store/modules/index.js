import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "./authStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        AuthStore
    }
});