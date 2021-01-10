<template>
  <div class="flex flex-column">
    <div v-if="!user">
      You must login to see My List page.
    </div>
    <b-form class="mt-5">
      <b-row class="flex align-items-center justify-content-aroun">
        <b-col cols="4">
          <b-form-group label="User Name">
            <b-form-input v-model="username"> </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group label="Password">
            <b-form-input v-model="password" type="password"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="2" class="mt-3">
          <b-button variant="primary" @click="loginApp">
            Sign in
          </b-button>
        </b-col>
      </b-row>

      <div v-if="error" class="mt-2">
        <span class="text-danger">{{ error.message }}</span>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    error: ""
  }),
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async loginApp() {
      const { username, password } = this;
      try {
        await this.login({ username, password });
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
