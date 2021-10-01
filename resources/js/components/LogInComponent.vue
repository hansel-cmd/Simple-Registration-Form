<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Log In Component</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"   
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="user.email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="user.password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary" v-if="!isProcessing">Login</button>
              <button class="btn btn-primary" type="button" disabled v-else>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
              <small id="emailHelp" class="form-text text-muted"
                  >Don't have an account? <router-link to="/register">Sign up!</router-link></small
                >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions } from 'vuex';

import * as authTypes from "../services/store/types/authStore";

export default {
  data() {
    return {
      isProcessing: false,
      user: {
        email: null,
        password: null,
      }
    }
  },
  mounted() {
    console.log("Log In Page");
  },
  created() {
  
    
  },
  methods: {
    ...mapActions({
      goLogin: authTypes.ACTION_LOGIN
    }),
    login() {

      this.isProcessing = true;
      this.goLogin({user: this.user})
          .then(res => {
            if (res["error"] != undefined) {
              console.log(res.error);
              Swal.fire({
                title: "Oops! Error",
                text: res.error,
                icon: "error",
                heightAuto: false,
              });
            } else {
              
              this.$router.push({
                name: "home"
              });

            }
            this.isProcessing = false;
          })
          .catch(err => console.log(err));
      
    }
  }
};
</script>
