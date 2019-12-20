<template>
  <Page class="class" actionBarHidden="true">
    <Layout :isLoading="currentUser.isLoading">
      <FlexboxLayout  width="100%" height="100%">
        <StackLayout class="form login-register-form">
          <Logo />
          <UserForm
            :processing="currentUser.isLoading"
            className="-rounded"
            :name="name"
            :email="email"
            :error="userFormError"
            @userDataInputChange="setValue"
            showName="true"
            errorMessageAlignment="center"
          />
          <PasswordForm
            :processing="currentUser.isLoading"
            :password="password"
            :confirmPassword="confirmPassword"
            className="-rounded"
            isSecure="true"
            :error="passwordFormError"
            @passwordValueChange="setValue"
            showConfirmPassword="true"
            isRegister="true"
            errorMessageAlignment="center"
          />
          <ErrorMessage :errorMessage="generalErr" />
          <Button
            backgroundColor="#284154"
            height="auto"
            padding="15"
            class="-primary -rounded-lg"
            text="Register"
            @tap="register"
          />
          <FlexboxLayout class="login-register-question" justifyContent="center">
            <Label color="#f06eaa" class="-muted" text="Already member?" />
            <Label class="-primary m-l-10 text-primary" text="Login" @tap="goToLogin" />
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </Layout>
  </Page>
</template>
<script>
import UserForm from "../components/UserForm.vue"
import PasswordForm from "../components/PasswordForm.vue"
import ErrorMessage from "../components/ErrorMessage.vue"
import Login from "./Login.vue"
import Logo from "../components/Logo.vue"
import Layout from "../components/Layout.vue"

import mixinRegister from "../../../mixins/register"

export default {
  mixins: [mixinRegister],
  components: {
    UserForm,
    Logo,
    Layout,
    ErrorMessage,
    PasswordForm,
  },
  methods: {
    goToLogin() {
      !this.currentUser.isLoading && this.$navigateTo(Login)
    },
    registerSuccessCallback() {
      this.$navigateTo(Login)
    },
    setValue(key, value) {
      this[key] = value
    },
  }  
}
</script>
