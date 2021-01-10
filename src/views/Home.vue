<template>
  <div class="home">
    <Login v-if="!user" />
    <h4 v-if="user">Home</h4>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Login from "@/components/Login";

export default {
  name: "Home",
  components: {
    Login
  },
  computed: {
    ...mapState("auth", ["user"])
  }
};
</script>
