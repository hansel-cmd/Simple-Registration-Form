<template>
  <div class="container">
    <div class="row justify-content-center mt-5 mb-2">
      <div class="col-md-4 w-100">
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
      <div class="col-md-8 w-100">
        <div class="card">
          <div class="card-header">Create a Post</div>
          <div class="card-body">
            <form class="pt-2" @submit.prevent="createPost">
              <div class="form-group">
                <label for="title">Post Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="post.title"
                  required
                />
              </div>
              <div class="form-group">
                <label for="body">Post Body</label>
                <textarea class="form-control" id="body" rows="5" required v-model="post.body"></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                v-if="!isProcessing"
              >
                Create Post
              </button>
              <button class="btn btn-primary" type="button" disabled v-else>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Adding...
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import * as authTypes from "../../services/store/types/authStore";
import * as postTypes from "../../services/store/types/postStore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isProcessing: false,
      post: {
        title: null,
        body: null,
        user_id: null,
      },
    };
  },
  created() {
    
  },
  methods: {
    ...mapActions({
      getUserInfo: authTypes.GETTER_USER,
      makePost: postTypes.ACTION_PUT_POSTS
    }),
    createPost() {

      this.post.title = this.post.title.toString();
      this.post.body = this.post.body.toString();
      this.post.user_id = this.user.user_id;

      this.isProcessing = true;
      this.makePost({post: this.post})
        .then(res => {

            this.isProcessing = false;
            this.post.title = '';
            this.post.body = '';

            Swal.fire({
                title: "",
                text: "Post Added.",
                icon: "success",
                heightAuto: false,
                timer: 1000
            });
        })
        .catch(err => console.log(err));
    },
  },
  computed: {
    ...mapGetters({
      user: authTypes.GETTER_USER,
    }),
  },
};
</script>