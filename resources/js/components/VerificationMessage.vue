<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-50">
        <div class="card">
          <div class="card-header">Verification Status</div>
          <div class="card-body">
            <div class="bg-success text-white p-2" v-if="signup_message">
              <p class="mb-0">{{ signup_message }}</p>
            </div>
            <div class="bg-danger text-white p-2" v-else-if="signup_error">
              <p class="mb-0">{{ signup_error }}</p>
            </div>
            <router-link to="/login">Go back to Log In</router-link>
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
      signup_message: "",
      signup_error: "",
    };
  },
  methods: {
    ...mapActions({
        verify: authTypes.ACTION_VERIFY
    })
  },
  created() {
    if (this.$route.query.token != undefined) {
      this.verify({ token: this.$route.query.token })
        .then((res) => {
          if (!res.verified[0]) {
            this.signup_error = "Verification failed.";
          } else {
            this.signup_message = "Verification successful.";
          }
        })
        .catch((err) => {
          console.log("hawtf");
          console.log(err);
        });
    }
  },
};
</script>