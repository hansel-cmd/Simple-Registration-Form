import Api from "../../api/api";
import * as types from "../types/authStore";

const state = {
    errors: null,
    user: {},
    isAuthenticated: false,
    token: ''
};


const getters = {
    [types.GETTER_USER](state) {
        return state.user;
    },
};

const actions = {
    [types.ACTION_REGISTER](context, data) {
        return new Promise(resolve => {
            Api().post("/register", data)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    resolve(err.response.data.errors);
                });
        });
    },

    [types.ACTION_VERIFY](context, data) {
        
        return new Promise(resolve => {
            Api().post("/auth", data)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    resolve(err.response.data.errors);
                });
        });
    }
};



export default {
    state,
    actions,
    // mutations,
    getters
  };