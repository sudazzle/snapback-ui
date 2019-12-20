<template>
  <div class="register-container">
    <div>
      <div>
        <Logo />
        <h5>New member registration</h5>
      </div>
      <form @submit.prevent="register">
        <Loading v-if="currentUser.isLoading" />
        <p><label>Name</label></p>
        <p>
          <b-form-input
            autocomplete="off"
            class="mb-0"
            v-model="name"
            :state="nameError"
            aria-describedby="name-input-box"
          />
          <b-form-invalid-feedback id="name-input-box">
            {{userFormError && userFormError.message}}
          </b-form-invalid-feedback>
        </p>
        <p class="mt-3"><label>Email</label></p>
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
        <p class="mt-3"><label>Confirm password</label></p>
        <p>
          <b-form-input
            class="mb-0"
            autocomplete="off"
            v-model="confirmPassword"
            :state="confirmPasswordError"
            type="password"
            aria-describedby="password-input-box"
          />
          <b-form-invalid-feedback id="password-input-box">
            {{passwordFormError && passwordFormError.message}}
          </b-form-invalid-feedback>
        </p>
        <p v-if="generalErr !== ''" class="error-msg">{{generalErr}}</p>
        <p>
          <button>Submit</button>
          <span>Already a member?<router-link to="/login">Login</router-link></span>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
  import Logo from "../components/Logo.vue"
  import Loading from "../components/Loading.vue"
  import registerMixins from "../../../mixins/register"

  import { getCSRFToken } from "../utils"

  export default {
    name: "register",
    mixins: [registerMixins],

    components: {
      Logo,
      Loading,
    },

    computed: {
      nameError() {
        return (this.userFormError && this.userFormError.errorFor === "name") ? false : null
      },
      emailError() {
        return (this.userFormError && this.userFormError.errorFor === "email") ? false : null
      },
      passwordError() {
        return (this.passwordFormError && this.passwordFormError.errorFor === "password") ? false : null
      },
      confirmPasswordError() {
        return (this.passwordFormError && this.passwordFormError.errorFor === "confirmPassword") ? false : null
      },
    },

    methods: {
      getCSRFToken,
      registerSuccessCallback() {
        this.$router.push({ name: "login" })
      }
    }
  }
</script>