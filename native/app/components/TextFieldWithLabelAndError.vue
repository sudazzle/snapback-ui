<template>
  <StackLayout>
    <Label v-if="label" class="p-x-15 m-t-15">{{ label }}</Label>
    <ErrorMessage v-bind="$props" />
    <slot></slot>
  </StackLayout>
</template>
<script>
  import ErrorMessage from "./ErrorMessage.vue"
  export default {
    name: "textfield-label-error",
    props: {
      textAlign: {
        type: String,
        default: "left",
      },

      errorMessage: [String, Boolean],
      label: [String, Boolean]
    },
    components: {
      ErrorMessage,
    }
  }
</script>