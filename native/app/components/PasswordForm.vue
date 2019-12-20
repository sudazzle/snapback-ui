<template>
  <StackLayout>
     <TextFieldWithLabelAndError
      :label="showLabel ? getLabel('password') : false"
      :errorMessage="passwordErr"
      :textAlign="errorMessageAlignment"
    >
      <TextField
        :isEnabled="!processing"
        ref="password"
        :class="className"
        :hint="showLabel ? '' : getLabel('password')"
        :text="password"
        :secure="isSecure"
        @textChange="setValue($event, 'password', true)"
      />
    </TextFieldWithLabelAndError>
    <TextFieldWithLabelAndError
      v-if="showConfirmPassword"
      :label="showLabel ? getLabel('confirmPassword') : false"
      :errorMessage="confirmPasswordErr"
      :textAlign="errorMessageAlignment"
    >
      <TextField
        :isEnabled="!processing"
        :hint="showLabel ? '' : getLabel('confirmPassword')"
        ref="confirmPassword"
        :class="className"
        :text="confirmPassword"
        :secure="isSecure"
        @textChange="setValue($event, 'confirmPassword', true)"
      />
    </TextFieldWithLabelAndError>
  </StackLayout>
</template>
<script>
  import TextFieldWithLabelAndError from "./TextFieldWithLabelAndError.vue"
  import store from "../../../data/store"

  export default {
    name: "password-form",

    props: [
      "password",
      "confirmPassword",
      "className",
      "isSecure",
      "error",
      "isRegister",
      "isLogin",
      "showConfirmPassword",
      "showLabel",
      "processing",
      "errorMessageAlignment",
    ],

    data() {
      return {
        passwordErr: false,
        confirmPasswordErr: false,
      }
    },

    components: {
      TextFieldWithLabelAndError,
    },

    watch: {
      error(err) {
        if (err) {
          const { errorFor, message } = err
          const { password, confirmPassword } = this.$refs
          const passwordRef = password.nativeView

          if (errorFor === "password") {
            this.passwordErr = message
            passwordRef.focus()
          } else {
            this.passwordErr = false
          }

          if (confirmPassword) {
            const confirmPasswordRef = confirmPassword.nativeView
            if (errorFor === "confirmPassword") {
              this.confirmPasswordErr = message
              confirmPasswordRef.focus()
            } else {
              this.confirmPasswordErr = false
            }
          }
          
        } else {
          this.passwordErr = false
          this.confirmPasswordErr = false
        }
      },
    },

    methods: {
      setValue(value, name, isMobile=false) {
        this.$emit("passwordValueChange", name, isMobile ? value.value : value)
      },

      getLabel(type) {
        if (type === "password") {
          return !this.isRegister && !this.isLogin ? "New password" : "Password"
        } else {
          return !this.isRegister && !this.isLogin ? "Confirm new password" : "Confirm password"
        }
      },
    },
  }
</script>
