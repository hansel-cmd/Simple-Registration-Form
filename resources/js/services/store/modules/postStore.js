import Api from "../../api/api";
import * as types from "../types/postStore";

const state = {
    errors: null,
    posts: []
};


const getters = {
    [types.GETTER_POSTS](state) {
        return state.user;
    },
};

const actions = {
    [types.ACTION_PUT_POSTS](context, data) {
        return new Promise(resolve => {
            Api().post("/create-post", data.post)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    resolve(err.response.data.errors);
                });
        });
    },

   

    
};

const mutations = {
    
};


export default {
    state,
    actions,
    mutations,
    getters
};