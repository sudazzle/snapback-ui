<template>
  <AbsoluteLayout @loaded="onLoadedHandler" ref="rootLayout" width="100%" height="100%">
    <PullToRefresh v-if="pullToRefresh" left="0" top="0" width="100%" height="100%" @refresh="$emit('refresh', $event)">
      <ScrollView>
        <StackLayout class="m-y-6">
          <slot />
        </StackLayout>
      </ScrollView>
    </PullToRefresh>
    <slot v-if="!pullToRefresh" />
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
    <PullToRefresh backgroundColor="white" v-if="message" width="100%" height="100%" @refresh="$emit('refresh', $event)">
      <MessageContainer :message="message" />
    </PullToRefresh>
    <Loading v-if="isLoading" />
  </AbsoluteLayout>
</template>

<script>
  import Loading from "./Loading.vue"
  import MessageContainer from "./NoDataMessage.vue"
  import store from "../../../data/store"
  const app = require("tns-core-modules/application")
  const platform = require("tns-core-modules/platform")
  
  export default {
    props: ["isLoading", "addButton", "noDataMessage", "pullToRefresh"],

    data() {
      return {
        backend: store.state.backEnd
      }
    },

    computed: {
      message() {
        let message = false
        if (this.backend.errorForLayout) {
          message = this.backend.errorForLayout
        } else if (this.noDataMessage && this.noDataMessage.show) {
          message = this.noDataMessage.message
        } else {
        }
        return message
      }
    },

    components: {
      Loading,
      MessageContainer,
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