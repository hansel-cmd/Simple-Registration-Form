<template>
  <div class="container">
    <div class="row py-4">
      <div class="col-md-6 p-2" v-for="post in posts" :key="post.post_id">
        <div class="card w-100" >
          <div class="card-body">
            <ul class="list-unstyled">
              <li class="media">
                <img src="https://picsum.photos/100" class="mr-3" alt="..." />
                <div class="media-body">
                  <h5 class="mt-0 mb-1" style="font-weight: bold !important;">{{ post.title }}</h5>
                  <small>by: {{ post.username }} <span v-if="isPostMine(post.user_id)">(Yours)</span> | {{ post.user_id }} </small>
                  <p class="mb-0">{{ post.body }}</p>
                </div>
              </li>
            </ul>
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

export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getAllPosts()
      .then((res) => {
        console.log(res);
        this.posts = res;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    ...mapActions({
      getAllPosts: postTypes.ACTION_GET_POSTS,
    }),
    isPostMine(user_id) {
      return this.user.user_id == user_id;
    }
  },
  computed: {
    ...mapGetters({
      user: authTypes.GETTER_USER,
    })
  },
};
</script>