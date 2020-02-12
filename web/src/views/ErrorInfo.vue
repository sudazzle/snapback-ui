<template>
  <div class="mt-5 text-center">
    <h2 class="text-primary text-uppercase mb-4">Snap-back</h2>
    <h4 class="text-secondary mb-4">Oh O! something is wrong</h4>
    <b-list-group>
      <b-list-group-item v-if="error.backEnd.error === false">No internet connection or slower internet connection.</b-list-group-item>
      <b-list-group-item v-else>{{error.backEnd.error}}</b-list-group-item>
    </b-list-group>
    <div class="mt-4">
      <b-button class="px-5 py-3" @click="retry" pill variant="primary">Retry</b-button>
    </div>
  </div>
</template>
<script>
  import store from "../../../data/store"
  export default {
    data() {
      return {
        error: store.state
      }
    },
    name: "error-info",
    methods: {
      retry() {
        this.$router.push({ path: "/" })
      }
    }
  }
</script>