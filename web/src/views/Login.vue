<template>
  <div class="login-container">
    <div>
      <Logo />
      <form @submit.prevent="submit">
        <Loading v-if="currentUser.isLoading" />
        <p><label>Email</label></p>
        <p>
          <b-form-input
            autocomplete="off"
            class="mb-0"
            v-model="email"
            :state="emailError"
            type="email"
            aria-describedby="email-input-box"
          />
          <b-form-invalid-feedback id="email-input-box">
            {{userFormError && userFormError.message}}
          </b-form-invalid-feedback>
        </p>
        <p class="mt-3"><label>Password</label></p>
        <p>
          <b-form-input
            class="mb-0"
            autocomplete="off"
            v-model="password"
            :state="passwordError"
            type="password"
            aria-describedby="password-input-box"
          />
          <b-form-invalid-feedback id="password-input-box">
            {{passwordFormError && passwordFormError.message}}
          </b-form-invalid-feedback>
        </p>
        <p v-if="err.errorForPage" class="mt-2 error-msg">{{err.errorForPage}}</p>
        <p class="mt-3">
          <button type="submit">Login</button>
          <router-link class="forgot-pass" to="/reset-password">Reset password</router-link>
        </p>
      </form>
      <p class="register"><router-link to="/register">Register new user</router-link></p>
    </div>
  </div>
</template>

<script>
  import Logo from "../components/Logo.vue"
  import Loading from "../components/Loading.vue"
  import loginMixin from "../../../mixins/login"
  import { saveToken } from "../utils"

  export default {
    mixins: [loginMixin],

    components: {
      Logo,
      Loading,
    },

    computed: {
      emailError() {
        if (this.userFormError) {
          return false
        }

        return null
      },

      passwordError() {
        if (this.passwordFormError) {
          return false
        }

        return null
      },
    },

    methods: {
      loginSuccesCallback(user) {
        saveToken("auth", user.token)
        this.$router.push({ name: "nextSessions" })
      },
    }
  }
</script>