<template>
  <Page class="page">
    <ActionBarWithBackButton :processing="currentUser.isLoading" title="Member Profile" />
    <Layout :isLoading="currentUser.isLoading">
      <PullToRefresh @refresh="getMyInfo">
        <ScrollView>
          <StackLayout class="p-y-10">
            <Label class="h3 text-uppercase snapback-primary-text m-t-10 p-b-0 m-b-0 p-x-15">General Information</Label>
            <UserForm
              :processing="currentUser.isLoading"
              className="-border"
              showLabel="true"
              :name="name"
              :email="email"
              :error="userFormError"
              @userDataInputChange="setValue"
              showName="true"
            />
            <ErrorMessage :errorMessage="generalErrUserForm" />
            <Button
              :isEnabled="!currentUser.isLoading"
              backgroundColor="#284154"
              height="auto"
              class="-primary p-15 -rounded-sm"
              text="Update"
              @tap="editUser"
            />
            <Label class="h3 text-uppercase snapback-primary-text p-x-15 m-t-20 m-b-20">Change Password</Label>
            <PasswordForm
              :processing="currentUser.isLoading"
              :password="password"
              :confirmPassword="confirmPassword"
              className="-border"
              isSecure="true"
              :error="passwordFormError"
              @passwordValueChange="setValue"
              showConfirmPassword="true"
              showLabel="true"
            />
            <ErrorMessage :errorMessage="generalErrPasswordForm" />
            <Button
              :isEnabled="!currentUser.isLoading"
              backgroundColor="#284154"
              height="auto"
              class="-primary p-15 -rounded-sm snapback-primary-bg"
              text="Change Password"
              @tap="resetPassword"
            />
            <Button
              :isEnabled="!currentUser.isLoading"
              backgroundColor="#f06eaa"
              height="auto"
              class="-primary p-15 -rounded-sm m-t-30"
              text="Log out"
              @tap="logout"
            />
          </StackLayout>
        </ScrollView>
      </PullToRefresh>
    </Layout>
  </Page>
</template>
<script>
import ActionBarWithBackButton from "../components/ActionBarWithBackButton.vue"
import ErrorMessage from "../components/ErrorMessage.vue" 
import PasswordForm from "../components/PasswordForm.vue"
import Layout from "../components/Layout.vue"
import Login from "./Login.vue"
import UserForm from "../components/UserForm.vue"

import myProfile from "../../../mixins/myProfile"

import { validatePassword, validateUserForm } from "../../../utils/common"
import { whoAmI, updateUser, changeUserPassword } from "../../../data/users"
import store from "../../../data/store"
import { makeAlert, signOut } from "../utils"

export default {
  components: {
    ActionBarWithBackButton,
    ErrorMessage,
    Layout,
    PasswordForm,
    UserForm,
  },

  mixins: [myProfile],

  methods: {
    logout() {
      signOut()
      this.$navigateTo(Login, { clearHistory: true })
    },

    successCallback(message) {
      makeAlert(message)
    },

    setValue(key, value) {
      this[key] = value
    },
  },
}
</script>
