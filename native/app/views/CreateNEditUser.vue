<template>
  <Page class="page">
    <ActionBarWithBackButton :processing="processing" :title="(isUpdate ? 'Update' : 'Create') + ' member'" />
    <Layout pullToRefresh="true" :isLoading="processing" @refresh="_getUserById">
      <Label v-if="isUpdate" class="h3 p-x-15 p-t-20 text-uppercase" text="General Information" />
      <UserForm
        :processing="processing"
        className="-border"
        showLabel="true"
        :name="name"
        :email="email"
        :error="userFormError"
        @userDataInputChange="setValue"
        showName="true"
      />

      <StackLayout class="p-x-15 m-t-15" ref="radios">
        <Label text="Role" />
        <CheckBox
          :isEnabled="!processing"
          borderColor="#ccc"
          class="m-t-10"
          text="User"
          :checked="role === 'user'"
          boxType="circle"
          @checkedChange="handleCheckedChange($event, 'user')"
        />
        <CheckBox
          :isEnabled="!processing"
          class="m-t-10"
          text="Trainer"
          :checked="role === 'trainer'"
          boxType="circle"
          @checkedChange="handleCheckedChange($event, 'trainer')" />
        <CheckBox
          :isEnabled="!processing"
          class="m-t-10"
          text="Admin"
          :checked="role === 'admin'"
          boxType="circle"
          @checkedChange="handleCheckedChange($event, 'admin')"
        />
      </StackLayout>

      <PasswordForm
        v-if="!isUpdate"
        :processing="processing"
        :password="password"
        className="-border"
        :error="passwordFormError"
        @passwordValueChange="setValue"
        showLabel="true"
        isLogin="true"
      />
      <ErrorMessage :errorMessage="generalErrUserForm" />
      <Button
        :isEnabled="!processing"
        height="auto"
        backgroundColor="#284154"
        class="-primary p-y-20"
        :text="isUpdate ? 'Update' : 'Create'"
        @tap="submit"
      />
      
      <Label
        v-if="isUpdate"
        class="h3 p-x-15 p-t-20 text-uppercase"
        text="Reset member password"
      />
      <PasswordForm
        v-if="isUpdate"
        :processing="processing"
        :password="password"
        className="-border"
        :error="passwordFormError"
        @passwordValueChange="setValue"
        showLabel="true"
      />
      <ErrorMessage :errorMessage="generalErrPasswordForm" />
      <Button
        :isEnabled="!processing"
        height="auto"
        backgroundColor="#284154"
        v-if="isUpdate"
        class="-primary p-y-20"
        text="Reset password"
        @tap="resetpassword"
      />
    </Layout>
  </Page>
</template>
<script>
import ActionBarWithBackButton from "../components/ActionBarWithBackButton.vue"
import App from "../App.vue"
import ErrorMessage from "../components/ErrorMessage.vue" 
import NoDataMessage from "../components/NoDataMessage.vue"
import Layout from "../components/Layout.vue"
import PasswordForm from "../components/PasswordForm.vue"
import UserForm from "../components/UserForm.vue"
import { makeAlert } from "../utils"
import createNEditUser from "../../../mixins/createNEditUser"
import store from "../../../data/store"

export default {
  data() {
    return {      
      backend: store.state.backEnd
    }
  },

  mixins: [createNEditUser],
  
  components: {
    ActionBarWithBackButton,
    ErrorMessage,
    UserForm,
    NoDataMessage,
    PasswordForm,
    Layout,
  },

  methods: {
    handleCheckedChange(checkbox, role) {
      if (!checkbox.value) {
        return
      }

      this.role = role
    },

    setValue(key, value) {
      this[key] = value
    },

    successCallback(message) {
      makeAlert(message)
    },

    errorCallback(message) {
      makeAlert(message)
    },

    redirectCallback() {
      this.$navigateTo(AppNative, { props: { tab: 3 } })
    }
  },
}
</script>
