<template>
  <AbsoluteLayout @loaded="onLoadedHandler" ref="rootLayout" width="100%" height="100%">
    <!--<PullToRefresh left="0" top="0" width="100%" height="100%" @refresh="$emit('refresh', $event)">
    </PullToRefresh>-->
    <ScrollView left="0" top="0" width="100%" height="100%">
        <slot />
      </ScrollView>
    <AbsoluteLayout v-if="addButton" ref="fabItemPosition" marginTop="87%" marginLeft="77%">
      <Button
        @tap="onButtonTapHandler"
        fontSize="30"
        lineHeight="0"
        width="60"
        height="60"
        color="white"
        backgroundColor="#284154"
        class="-primary -rounded-lg"
        text="+"
        left="6"
        top="6"
        :isEnabled="!isLoading"
      />
    </AbsoluteLayout>
    <Loading v-if="isLoading" />
  </AbsoluteLayout>
</template>

<script>
  import Loading from "./Loading.vue"
  import NoDataMessage from "./NoDataMessage.vue"
  import store from "../../../data/store"
  const app = require("tns-core-modules/application")
  const platform = require("tns-core-modules/platform")
  
  export default {
    props: ["isLoading", "addButton"],

    data() {
      console.log("here we come", store.state.backEnd.errorForLayout)
      return {
        backend: store.state.backEnd
      }
    },

    components: {
      Loading,
      NoDataMessage,
    },

    methods: {
      onButtonTapHandler() {
        if (!this.isLoading) {
          this.$emit("itemAddEvent")
        }
      },

      onLoadedHandler() {
        if (this.addButton) {
          const fabItemPosition = this.$refs.fabItemPosition.nativeView
          const rootLayout = this.$refs.rootLayout.nativeView

          // Needed to avoid masking child components on Android
          if (app.android && platform.device.sdkVersion >= "21") {
            fabItemPosition.android.setClipChildren(false)
            rootLayout.android.setClipChildren(false)
          }
        }
      },
    }
  }
</script>