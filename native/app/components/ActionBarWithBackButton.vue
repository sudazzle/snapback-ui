<template>
  <ActionBar class="snapback-secondary-bg" :title="title">
    <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="gotoBack"></NavigationButton>
  </ActionBar>
</template>

<script>
  export default {
    name: "action-bar-native",
    props: ["title", "processing"],
    methods: {
      gotoBack() {
        if (!this.processing) {
          this.$navigateBack()
        }
      }
    }
  }
</script>