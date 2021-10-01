<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Register Component</div>
          <div class="card-body">
            <div class="bg-info text-white p-2" v-if="signup_message">
              <p class="mb-0">{{ signup_message }}</p>
            </div>
            <form @submit.stop.prevent="register">
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
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                  v-model="user.username"
                  required
                />
              </div>
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="first_name"
                  aria-describedby="emailHelp"
                  placeholder="Enter First Name"
                  v-model="user.first_name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="last_name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Last Name"
                  v-model="user.last_name"
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
              <div class="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  v-model="user.confirm_password"
                  required
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                v-if="!isProcessing"
              >
                Register
              </button>
              <button class="btn btn-primary" type="button" disabled v-else>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
              <small id="emailHelp" class="form-text text-muted"
                  >Already have an account? <router-link to="/login">Sign in!</router-link></small
                >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as authTypes from "../services/store/types/authStore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isProcessing: false,
      signup_message: "",
      user: {
        email: null,
        first_name: null,
        last_name: null,
        password: null,
        confirm_password: null,
      },
    };
  },
  mounted() {
    console.log("Register Page");
  },
  methods: {
    ...mapActions({
      goRegister: authTypes.ACTION_REGISTER,
    }),
    register() {

      if (this.user.password != this.user.confirm_password) {
           Swal.fire({
              title: "Oops! Error",
              text: "Password and Confirm Password does not match.",
              icon: "error",
              confirmButtonClass: "btn btn-secondary",
              heightAuto: false,
            });
            return;
      }

      this.isProcessing = true;
      this.goRegister(this.user)
        .then((res) => {
          if (res.error) {
            console.log(res.error);
            Swal.fire({
              title: "Oops! Error",
              text: res.error[0],
              icon: "error",
              confirmButtonClass: "btn btn-secondary",
              heightAuto: false,
            });
          } else {
            this.signup_message =
              "Please verify your account. Check your email.";
          }
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log("something is wrong man");
          console.log(err);
        });
    },
  },
};
</script>
