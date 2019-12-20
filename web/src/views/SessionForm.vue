<template>
  <div class="add-edit-session loading-wrapper">
    <Loading v-if="processing" />
    <h5>{{ isCreate ? "Create New Session" :  "Update Session" }}</h5>
    <form @submit.prevent="submit">
      <label for="">Title</label>
      <b-form-input class="mb-1" :state="titleError" aria-describedby="title-input-box"  v-model="title" ref="title" type="text" name="title" />
      <b-form-invalid-feedback v-if="titleErr" id="title-input-box">
        {{ titleErr }}
      </b-form-invalid-feedback>
      <label class="mt-3" for="">Description</label>
      <b-form-textarea
        v-model="description"
        rows="3"
        class="mb-1"
      />
      <label class="mt-3" for="">Max Participants</label>
      <b-form-input class="mb-1" ref="maxParticipants" :state="maxParticipantsError" aria-describedby="maxParticipants-input-box" v-model="max_participants" type="number" />
      <b-form-invalid-feedback v-if="maxParticipantsErr" id="maxParticipants-input-box">
        {{ maxParticipantsErr }}
      </b-form-invalid-feedback>
      <label class="mt-3" for="">Date and Time</label>
      <div class="date-time">
        <div>
          <b-form-select @change="yearChangeHandler" v-model="selectedDate.year" :options="years"></b-form-select><span>-</span>
          <b-form-select @change="monthChangeHandler" v-model="selectedDate.month" :options="months"></b-form-select><span>-</span>
          <b-form-select @change="dayChangeHandler" v-model="selectedDate.day" :options="days"></b-form-select>
        </div>
        <div>
          <b-form-select v-model="selectedTime.hour" :options="hours"></b-form-select><span>:</span>
          <b-form-select v-model="selectedTime.minute" :options="minutes"></b-form-select>
        </div>
        <div style="line-height: 2.4;">{{ selectedDate.weekDay }}</div>
      </div>

      <b-button variant="primary" type="submit">{{ isCreate ? 'Create' : 'Update'}} Session</b-button>
    </form>
  </div>
</template>
<script>
  import Loading from "../components/Loading.vue"

  import { getYearsList, getMonths, getDaysOfGivenYearAndMonth, getHours, getMinutes, getDay } from "../../../utils/common"
  import { getCSRFToken, makeToast } from "../utils"
  import store from "../../../data/store"
  import sessionFormMixin from "../../../mixins/sessionForm"

  export default {
    data() {
      const { year, month } = store.state.selectedDate
      const years = getYearsList()
      const months = getMonths()
      const days = getDaysOfGivenYearAndMonth(year, month)
      const hours = getHours()
      const minutes = getMinutes()

      return {
        years,
        months,
        days,
        hours,
        minutes,
      }
    },
    
    computed: {
      titleError() {
        if (this.titleErr) {
          return false
        }

        return null
      },

      maxParticipantsError() {
        if (this.maxParticipantsErr) {
          return false
        }

        return null
      }
    },

    components: {
      Loading,
    },

    mixins: [sessionFormMixin],

    methods: {
      makeToast,
      getCSRFToken,

      redirectCallback() {
        this.$router.push({ name: 'sessionlist' })
      },

      successCallback(message) {
        this.makeToast("success", message)
      },

      errorCallback(message) {
        this.makeToast("warning", message)
      },

      yearChangeHandler(year) {
        let { month, day } = this.selectedDate
        const newDays = getDaysOfGivenYearAndMonth(year, month)
        
        if (newDays.length < Number(this.selectedDate.day)) {
          day = 1
        }

        this.setSelectedDate(year, month, day)
        this.days = newDays
      },

      monthChangeHandler(month) {
        let { year, day } = this.selectedDate
        const newDays = getDaysOfGivenYearAndMonth(year, month)
        if (newDays.length < Number(this.selectedDate.day)) {
          day = 1
        }

        this.setSelectedDate(year, month, day)
        this.days = newDays
      },

      dayChangeHandler(day) {
        const { year, month } = this.selectedDate
        this.setSelectedDate(year, month, day)
      },

      setSelectedDate(year, month, day) {
        const tempDate = new Date(`${year}-${month}-${day}`)
        store.setSelectedDate({ year, month, day, weekDay: getDay(tempDate.getDay()) })
      },

      focusInput(inputItem) {
        this.$refs[inputItem].focus()
      },
    }
  }
</script>