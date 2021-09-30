<template>
    <div>
        <router-link to="/">/</router-link>
        <router-link to="/test">/test</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "Test",
  mounted() {
    console.log("haha");
  }
};
</script>