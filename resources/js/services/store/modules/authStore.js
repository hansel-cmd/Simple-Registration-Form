import Api from "../../api/api";
import * as types from "../types/authStore";

const state = {
    errors: null,
    user: {},
    isAuthenticated: false,
    token: '',
    session_token: ''
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
    },

    [types.ACTION_LOGIN](context, data) {
        return new Promise(resolve => {
            Api().post("/login", data.user)
                .then(resp => {


                    console.log("hello world");
                    console.log(resp.data.session_token);
                    console.log("world hello");
                    context.commit(types.MUTATION_SET_USER, resp.data.user);
                    context.commit(types.MUTATION_SET_TOKEN, resp.data.token);
                    context.commit(types.MUTATION_SET_SESSION_TOKEN, resp.data.session_token);

                    // ako i-set ang session_token 
                    resolve(resp.data);
                })
                .catch(err => {
                    resolve(err.response.data.errors);
                });
        });
    },

    async [types.ACTION_VERIFY_AUTH]({ commit, dispatch }) {
        if (localStorage.getItem('token') && localStorage.getItem('session_token')) {
            let session_token = await dispatch(types.ACTION_GET_SESSION_TOKEN);

            if (session_token.length == 0) {
                commit(types.MUTATION_SET_AUTH, false);
                return false;
            }

            if (session_token[0].session_token != localStorage.getItem('session_token')) {
                commit(types.MUTATION_SET_AUTH, false);
                return false;
            } else {
                commit(types.MUTATION_SET_AUTH, true);
                await dispatch(types.ACTION_FETCH_USER_INFO);
                return true;
            }


        } else {
            commit(types.MUTATION_SET_AUTH, false);
            return false;
        }
    },

    [types.ACTION_GET_SESSION_TOKEN](context, data) {
        return new Promise(resolve => {
            Api().post("/get-token", { 'user_id': localStorage.getItem("user_id") })
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    context.commit(types.MUTATION_SET_ERROR, err.response.data.errors);
                    resolve(err.response.data.errors);
                });
        });
    },

    [types.ACTION_FETCH_USER_INFO](context) {
        return new Promise(resolve => {
            Api().post("/get-user-info", { 'user_id': localStorage.getItem("user_id") })
                .then(resp => {
                    context.commit(types.MUTATION_SET_USER, resp.data);
                    resolve(true);
                })
                .catch(err => {
                    context.commit(types.MUTATION_SET_ERROR, err.response.data.errors);
                    resolve(err.response.data.errors);
                });
        });
    },

    [types.ACTION_LOGOUT](context) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('session_token');
    },
};

const mutations = {
    [types.MUTATION_SET_USER](state, user) {
        state.user = user;
        if (user == null) {
            localStorage.removeItem("user_id");
        } else {
            localStorage.setItem("user_id", state.user.user_id);
        }
    },
    [types.MUTATION_SET_ERROR](state, error) {
        state.errors = error;
    },
    [types.MUTATION_SET_TOKEN](state, token) {
        state.token = token;
        if (token == null) {
            localStorage.removeItem("token");
        } else {
            localStorage.setItem("token", state.token);
        }
    },
    [types.MUTATION_SET_SESSION_TOKEN](state, token) {
        state.session_token = token;
        if (token == null) {
            localStorage.removeItem("session_token");
        } else {
            localStorage.setItem("session_token", token);
        }
    },
    [types.MUTATION_SET_AUTH](state, auth) {
        state.isAuthenticated = auth;
    },
};


export default {
    state,
    actions,
    mutations,
    getters
};