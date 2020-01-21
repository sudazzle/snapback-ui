<template>
  <div class="mt-5 text-center">
    <h2 class="text-primary text-uppercase mb-4">Snap-back</h2>
    <h4 class="text-secondary mb-4">Page Not Found</h4>
    <div class="mt-4">
      <b-button class="px-5 py-3" @click="goBack" pill variant="primary">Go back</b-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "error-info",
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>