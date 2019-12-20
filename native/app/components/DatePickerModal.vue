<template>
  <Page>
    <DatePicker
      :year="year"
      :month="month"
      :day="day"
      v-model="selectedDate"
      @dateChange="onDateChange"
    />
  </Page>
</template>
<script>
  import { prependZero, getDay } from "../../../utils/common"
  import store from "../../../data/store"

  export default {
    props: ["year", "month", "day"],

    data() {
      return {
        selectedDate: new Date(`${this.year}-${this.month}-${this.day}`),
      }
    },

    methods: {
      onDateChange() {
        const year = this.selectedDate.getFullYear()
        const month = this.selectedDate.getMonth() + 1
        const day = this.selectedDate.getDate()
        const weekDay = getDay(this.selectedDate.getDay())
        store.setSelectedDate({ year, month, day, weekDay })
      }
    }
  }
</script>