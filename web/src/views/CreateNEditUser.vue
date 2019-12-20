<template>
  <div class="edit-user loading-wrapper">
    <Loading v-if="processing" />
    <h5>{{isUpdate ? 'Update member' : 'Add new member'}}</h5>
    <form @submit.prevent="submit">
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
      <p class="mt-4 mb-1"><label>Email</label></p>
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
      <b-form-group class="mt-4" label="Member role">
      <b-form-radio-group
        v-model="role"
        :options="roleOptions"
        name="radio-inline"
      ></b-form-radio-group>
    </b-form-group>
      <div v-if="!isUpdate">
        <p class="mt-3 mb-1"><label>Password</label></p>
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
      </div>
      <p v-if="generalErrUserForm" class="error-msg">{{generalErrUserForm}}</p>
      <b-button variant="primary" type="submit">{{ isUpdate ? 'Update' : 'Add' }} Member</b-button>
    </form>
    <form v-if="isUpdate" @submit.prevent="resetpassword">
      <h5>Reset member password</h5>
      <p class="mt-3 mb-1"><label>Password</label></p>
      <p>
        <b-form-input
          class="mb-2"
          autocomplete="off"
          v-model="password"
          :state="passwordError"
          type="password"
          aria-describedby="password-input-box"
        />
        <b-form-invalid-feedback id="password-input-box">
          {{passwordFormError && passwordFormError.message}}
        </b-form-invalid-feedback>
        <p v-if="generalErrPasswordForm" class="error-msg">{{generalErrPasswordForm}}</p>
        <b-button variant="primary" type="submit">Reset Password</b-button>
      </p>
    </form>
  </div>
</template>
<script>
  import Loading from "../components/Loading"
  import createNEditUser from "../../../mixins/createNEditUser"
  import { makeToast, getCSRFToken } from "../utils"
  export default {
    data() {
      return {
        roleOptions: [
          { text: 'User', value: 'user' },
          { text: 'Trainer', value: 'trainer' },
          { text: 'Admin', value: 'admin' }
        ]
      }
    },

    mixins: [createNEditUser],

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
      }
    },

    created() {
      getCSRFToken()
    },

    methods: {
      makeToast,
      successCallback(message) {
        this.makeToast("success", message)
      },
      errorCallback(message) {
        this.makeToast("info", message)
      },
      redirectCallback() {
        this.$router.push({ name: "userlist", params: { makeToast: true } })
      }
    }
  }
</script>