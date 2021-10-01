<template>
    <div>
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