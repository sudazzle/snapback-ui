<template>
  <Page>
    <TimePicker
      :hour="hour"
      :minute="minute"
      v-model="selectedTime"
      @timeChange="onTimeChange"
    />
  </Page>
</template>
<script>
  import { prependZero } from "../../../utils/common"
  import store from "../../../data/store"

  export default {
    props: ["hour", "minute"],

    data() {
      return {
        selectedTime: new Date(`1700-12-12 ${this.hour}:${this.minute}:00`),
      }
    },

    methods: {
      onTimeChange() {
        const hour = this.selectedTime.getHours()
        const minute = this.selectedTime.getMinutes()

        store.setSelectedTime({ hour, minute })
      }
    }
  }
</script>