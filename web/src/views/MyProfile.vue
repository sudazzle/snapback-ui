<template>
  <div class="edit-user loading-wrapper">
    <Loading v-if="currentUser.isLoading" />
    <h5>Update profile</h5>
    <form @submit.prevent="editUser">
      <p class="mb-1"><label>Name</label></p>
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
      <p class="mt-3 mb-1"><label>Email</label></p>
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
      <p v-if="generalErrUserForm" class="error-msg">{{generalErrUserForm}}</p>
      <b-button class="mt-1" variant="primary" type="submit">Update</b-button>
    </form>
    <div>
      <h5>Change password</h5>
      <form @submit.prevent="resetPassword">
        <p class="mt-3 mb-1"><label>New password</label></p>
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
        <p class="mt-3 mb-1"><label>Confirm password</label></p>
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
        <p v-if="generalErrPasswordForm" class="error-msg">{{generalErrPasswordForm}}</p>
        <b-button class="mt-1" variant="primary" type="submit">Change password</b-button>
      </form>
    </div>
  </div>
</template>
<script>
  import myProfile from "../../../mixins/myProfile"
  import Loading from "../components/Loading.vue"
  import { signOut, makeToast, getCSRFToken } from "../utils"
  export default {
    mixins: [myProfile],

    components: {
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
      makeToast,
      getCSRFToken,
      successCallback(message) {
        this.makeToast("success", message)
      }
    }
  }
</script>