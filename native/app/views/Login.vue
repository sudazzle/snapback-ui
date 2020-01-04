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
          <PasswordForm
            :processing="currentUser.isLoading"
            :password="password"
            className="-rounded"
            isLogin="true"
            isSecure="true"
            :error="passwordFormError"
            @passwordValueChange="setValue"
            errorMessageAlignment="center"
          />
          <ErrorMessage :errorMessage="err" />
          <Button
            :isEnabled="!currentUser.isLoading"
            height="auto"
            padding="15"
            backgroundColor="#284154"
            class="-primary -rounded-lg"
            text="LOGIN"
            @tap="submit" />
          <FlexboxLayout class="login-register-question" justifyContent="center">
            <Label color="#f06eaa" class="-muted" text="Forgot Password?" />
            <Label class="-primary m-l-10 text-primary" text="Reset" @tap="goToReset" />
          </FlexboxLayout>
          <FlexboxLayout class="login-register-question" justifyContent="center">
            <Label color="#f06eaa" class="-muted" text="Don't have account?" />
            <Label class="-primary m-l-10 text-primary" text="Register" @tap="goToRegister" />
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </Layout>
  </Page>
</template>

<script>
  import App from "../App.vue"
  import Layout from "../components/Layout.vue"
  import Register from "./Register.vue"
  import ResetPassword from "./ResetPassword.vue"
  import Logo from "../components/Logo.vue"
  import UserForm from "../components/UserForm.vue"
  import ErrorMessage from "../components/ErrorMessage.vue"
  import PasswordForm from "../components/PasswordForm.vue"
   
  import store from "../../../data/store"
  import loginMixin from "../../../mixins/login"
  
  import { makeAlert, getCSRFToken, saveToken, presistUserInfo } from "../utils"

  export default {
    mixins: [loginMixin],

    components: {
      Layout,
      Logo,
      UserForm,
      PasswordForm,
      ErrorMessage,
    },
    
    methods: {
      getCSRFToken,

      goToRegister() {
        !this.currentUser.isLoading && this.$navigateTo(Register)
      },

      goToReset() {
        !this.currentUser.isLoading && this.$navigateTo(ResetPassword)
      },

      setValue(key, value) {
        this[key] = value
      },

      loginSuccesCallback({ token, ID, role }) {
        saveToken("auth", token)
        presistUserInfo({ ID, role })
        this.$navigateTo(App, { clearHistory: true })
      },     
    }
  }
</script>
