<template>
  <div class="flex flex-column flex-start">
    <b-form v-if="!confirmPassword">
      <b-form-row>
        <b-col>
          <b-form-group label="User Name">
            <b-form-input v-model="username"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Password">
            <b-form-input v-model="password" type="password"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Email">
            <b-form-input v-model="email"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-button @click="signUpApp" variant="success">
        Sign Up
      </b-button>
      <div v-if="error" class="mt-2">
        <span class="text-danger">{{ error.message }}</span>
      </div>
    </b-form>

    <b-form v-if="confirmPassword">
      <b-form-row>
        <b-col>
          <b-form-group label="User Name">
            <b-form-input v-model="username"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Code">
            <b-form-input v-model="code"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-button @click="confirmSignUpApp" variant="outline-primary">
        Confirm Code
      </b-button>
      <div v-if="error" class="mt-2">
        <span class="text-danger">{{ error.message }}</span>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "@/router";
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    code: "",
    confirmPassword: false,
    error: ""
  }),

  methods: {
    ...mapActions("auth", ["signUp", "confirmSignUp", "login"]),
    async signUpApp() {
      const { username, password, email } = this;
      if (!email || !password) {
        return;
      }
      try {
        await this.signUp({ username, password, email });
        this.confirmPassword = true;
      } catch (error) {
        this.error = error;
      }
    },
    async confirmSignUpApp() {
      const { username, code, password } = this;
      if (!username || !code) {
        return;
      }
      try {
        await this.confirmSignUp({ username, code });
        await this.login({ username, password });
        router.push({ name: "List" });
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
