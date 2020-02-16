<template>
  <Page class="page" actionBarHidden="true">
    <Layout :isLoading="currentUser.isLoading">
      <FlexboxLayout width="100%" height="100%">
        <StackLayout class="form login-register-form" orientation="vertical">
          <Logo />
          <UserForm
            :processing="currentUser.isLoading"
            className="-rounded"
            :email="email"
            :error="userFormError"
            @userDataInputChange="setValue"
            errorMessageAlignment="center"
          />
          <ErrorMessage :errorMessage="err" />
          <Button
            :isEnabled="!currentUser.isLoading"
            height="auto"
            padding="15"
            backgroundColor="#284154"
            class="-primary -rounded-lg"
            text="Reset Password"
            @tap="submit" />
          <Label class="text-center" wordwrap="true">New password will be sent to your email address.</Label>
          <FlexboxLayout class="login-register-question" justifyContent="center">
            <Label class="-primary m-l-10 text-primary" text="Goto Login" @tap="goToLogin" />
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </Layout>
  </Page>
</template>

<script>
  import Layout from "../components/Layout.vue"
  import Login from "./Login.vue"
  import Logo from "../components/Logo.vue"
  import UserForm from "../components/UserForm.vue"
  import ErrorMessage from "../components/ErrorMessage.vue"
   
  import store from "../../../data/store"
  import resetPassword from "../../../mixins/resetPassword"
  
  import { makeAlert } from "../utils"

  export default {
    mixins: [resetPassword],

    components: {
      Layout,
      Logo,
      UserForm,
      ErrorMessage,
    },
    
    methods: {
      goToLogin() {
        this.$navigateTo(Login)
      },

      setValue(key, value) {
        this[key] = value
      },

      successCallback() {
        this.goToLogin()
      },     
    }
  }
</script>
