<template>
   <Label
      v-if="errorMessage"
      :textAlignment="textAlign"
      fontSize="13px"
      class="m-t-5 m-x-15 text-danger"
      :text="errorMessage"
    />
</template>
<script>
  export default {
    name: "error-message",
    props: {
      textAlign: {
        type: String,
        default: "left",
      },

      errorMessage: [String, Boolean],
    }
  }
</script>