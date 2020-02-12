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
        <p v-if="err" class="mt-2 error-msg">{{err}}</p>
        <p class="mt-3">
          <button type="submit">Reset Password</button>
          <router-link to="/login">Goto Login</router-link>
        </p>
      </form>
    </div>
    <b-modal
      id="password-reset-modal" 
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      ok-only
      ok-title="Got it, goto Login"
      @ok="handleOk"
      title="Password reset"
    >
      Your password has been reset. If you have entered the correct email address you will receive the new password shortly.
    </b-modal>
  </div>
</template>

<script>
  import Logo from "../components/Logo.vue"
  import Loading from "../components/Loading.vue"
  import resetPassword from "../../../mixins/resetPassword"

  export default {
    mixins: [resetPassword],

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
    },

    methods: {
      successCallback() {
        this.$root.$emit("bv::show::modal", "password-reset-modal")
      },

      handleOk() {
        this.$router.push({ path: "/login" })
      }
    }
  }
</script>