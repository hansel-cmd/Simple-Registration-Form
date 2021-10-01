<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Log In Component</div>
          <div class="card-body">
            <div class="bg-success text-white p-2" v-if="signin_message">
              <p class="mb-0">{{ signin_message }}</p>
            </div>
            <div class="bg-danger text-white p-2" v-else-if="signin_error">
              <p class="mb-0">{{ signin_error }}</p>
            </div>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"   
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import * as authTypes from "../services/store/types/authStore";

export default {
  data() {
    return {
      signin_message: "",
      signin_error: "",
    }
  },
  mounted() {
    console.log("Log In Page");
  },
  created() {

    if (this.$route.query.token != undefined) {
      this.verify({ token: this.$route.query.token })
        .then(res => {

          if (!res.verified[0]) {
            this.signin_error = "Verification failed.";
          } else {
            this.signin_message = "Verification successful.";
          }

        }).catch(err => {
          console.log("hawtf");
          console.log(err)
        });
    }
  },
  methods: {
    ...mapActions({
      verify: authTypes.ACTION_VERIFY
    }),
  }
};
</script>
