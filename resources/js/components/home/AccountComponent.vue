<template>
  <div class="container">
    <div class="row justify-content-center vh-100 mt-5">
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Your Information</div>
          <div class="card-body">
              <div>
                  <p>First Name</p>
                  <p class="pl-4">{{ user.first_name }}</p>
              </div>
              <div>
                  <p>Last Name</p>
                  <p class="pl-4">{{ user.last_name }}</p>
              </div>
              <div>
                  <p>Username</p>
                  <p class="pl-4">{{ user.username }}</p>
              </div>
              <div>
                  <p>User Email</p>
                  <p class="pl-4">{{ user.email }}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


import * as authTypes from "../../services/store/types/authStore";

export default {
    data() {
        return {

        }
    },
    created() {
        console.log(this.user)
    },
    methods: {
        ...mapActions({
            getUserInfo: authTypes.GETTER_USER
        })
    },
    computed: {
        ...mapGetters({
            user: authTypes.GETTER_USER
        })
    }
}
</script>