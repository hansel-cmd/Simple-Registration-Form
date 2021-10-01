<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Log In Component</div>
          <div class="card-body">
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
      
    }
  },
  mounted() {
    console.log("Log In Page");
  },
  created() {

    
  },
  methods: {
    ...mapActions({
      
    }),
  }
};
</script>
