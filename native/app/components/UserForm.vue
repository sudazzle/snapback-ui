<template>
  <StackLayout>
    <TextFieldWithLabelAndError
      :label="showLabel ? 'Name' : false"
      v-if="showName"
      :errorMessage="nameErr"
      :textAlign="errorMessageAlignment"
    >
      <TextField
        :isEnabled="!processing"
        :class="className"
        :hint="showLabel ? '' : 'Name'"
        autocapitalizationType="none"
        autocorrect="false"
        @textChange="emitOnChange($event, 'name', true)"
        returnKeyType="next"
        ref="name"
        :text="name"
      />
    </TextFieldWithLabelAndError>
    <TextFieldWithLabelAndError
      :label="showLabel ? 'Email' : false"
      :errorMessage="emailErr"
      :textAlign="errorMessageAlignment"
    >
      <TextField
        :isEnabled="!processing"
        :class="className"
        :hint="showLabel ? '' : 'Email'"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        returnKeyType="next"
        @textChange="emitOnChange($event, 'email', true)"
        :text="email"
        ref="email"
      />
    </TextFieldWithLabelAndError>
  </StackLayout>
</template>

<script>
  import TextFieldWithLabelAndError from "./TextFieldWithLabelAndError.vue"

  export default {
    name: "user-form",
    props: [
      "name",
      "email",
      "error",
      "className",
      "showLabel",
      "showName",
      "processing",
      "errorMessageAlignment",
    ],

    components: {
      TextFieldWithLabelAndError,
    },

    data() {
      return {
        nameErr: false,
        emailErr: false,
      }
    },

    watch: {
      error(err) {
        if (err) {
          const { errorFor, message } = err
          const { name, email } = this.$refs
          
          if (name) {
            const nameRef = name.nativeView
            if (errorFor === "name") {
              this.nameErr = message
              nameRef.focus()
            } else {
              this.nameErr = false
            }
          }

          const emailRef = email.nativeView
          if (errorFor === "email") {
            this.emailErr = message
            emailRef.focus()
          } else {
            this.emailErr  = false
          }
        } else {
          this.nameErr = false
          this.emailErr = false
        }
      },
    },

    methods: {
      emitOnChange(val, name, isMobile=false) {
        this.$emit("userDataInputChange", name, isMobile ? val.value : val)
      },
    },
  }
</script>
