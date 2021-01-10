<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="navbar-horizantal">
      <b-navbar-brand class="navbar-brand" href="https://devsalary.tk"
        >SHOPPING LIST APP</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="ml-auto">
            <div v-if="user" class="text-muted" :style="{ fontSize: '14px' }">
              Welcome {{ user.username }}!
            </div>
            <router-link to="/list" v-if="user">
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="handleList">List</a>
              </li>
            </router-link>
            <router-link to="/about">
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="handleAbout">About</a>
              </li>
            </router-link>
            <router-link to="/" v-if="user">
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="handleLogOut"
                  >Sign Out</a
                >
              </li>
            </router-link>
            <router-link to="/" v-if="!user">
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="handleLogIn"
                  >Log In</a
                >
              </li>
            </router-link>
            <router-link to="/signup" v-if="!user">
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="handleSignUp"
                  >Sign Up</a
                >
              </li>
            </router-link>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router";
export default {
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async handleLogOut() {
      await this.logout();
      router.push({ name: "Home" });
    },
    async handleLogIn() {
      router.push({ name: "Home" });
    },
    async handleSignUp() {
      router.push({ name: "SignUp" });
    },
    async handleList() {
      router.push({ name: "List" });
    },
    async handleAbout() {
      router.push({ name: "About" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
