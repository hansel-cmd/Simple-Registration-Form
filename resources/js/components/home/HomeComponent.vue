<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
      <router-link to="/home">
        <a class="navbar-brand" href="#">SomeLogo</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/home">
                <a class="nav-link"
              >Account <span class="sr-only">(current)</span></a
            >
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts">
                <a class="nav-link">Public Posts</a>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Others
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" @click="onLogout" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>

import * as authTypes from "../../services/store/types/authStore";

export default {
  methods: {
    onLogout() {
      this.$store
        .dispatch(authTypes.ACTION_LOGOUT)
        .then(() => {
          this.$router.push({ name: "index" })
        });
    },
  }
}
</script>