<template>
  <Page class="page">
    <ActionBarWithBackButton :processing="processing" :title="(isCreate ? 'Create' : 'Update') + ' Session'" />
    <Layout :isLoading="processing">
      <PullToRefresh @refresh="_getSessionById">
        <ScrollView>
          <StackLayout>
            <TextFieldWithLabelAndError
              label="Title"
              :errorMessage="titleErr"
            >
              <TextField
                :isEnabled="!processing"
                class="-border"
                v-model="title"
                returnKeyType="next"
                ref="title"
              />
            </TextFieldWithLabelAndError>
            <TextFieldWithLabelAndError
              label="Description"
            >
              <TextView :isEnabled="!processing" class="-border" v-model="description" />
            </TextFieldWithLabelAndError>
            <TextFieldWithLabelAndError
              label="Max Participants"
              :errorMessage="maxParticipantsErr"
            >
              <TextField
                :isEnabled="!processing"
                class="-border"
                v-model="max_participants"
                returnKeyType="next"
                ref="maxParticipants"
              />
            </TextFieldWithLabelAndError>
            <TextFieldWithLabelAndError label="Date & Time">
              <FlexboxLayout class="m-x-15 m-t-5">
                <Label
                  borderColor="#ccc"
                  borderWidth="1"
                  borderRadius="5"
                  padding="12"
                  :text="`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`"
                  @tap="selectDateNative" />
                <Label
                  borderColor="#ccc"
                  borderWidth="1"
                  borderRadius="5"
                  padding="12"
                  marginLeft="5"
                  :text="`${selectedTime.hour}:${selectedTime.minute}`"
                  @tap="selectTimeNative" />
                <Label
                  borderRadius="5"
                  padding="12"
                  marginLeft="5"
                  :text="selectedDate.weekDay"
                />
              </FlexboxLayout>
            </TextFieldWithLabelAndError>
            <Button
              :isEnabled="!processing"
              height="auto"
              padding="20"
              backgroundColor="#284154"
              class="-primary m-t-10"
              @tap="submit"
            >{{ isCreate ? 'Create' : 'Update'}} Session</Button>
          </StackLayout>
        </ScrollView>
      </PullToRefresh>
    </Layout>
  </Page>
</template>
<script>
import {
  getMonths,
  getDaysOfGivenYearAndMonth,
  getYearsList,
  getHours,
  getMinutes,
} from "../../../utils/common"
import DatePickerModal from "../components/DatePickerModal.vue"
import Layout from "../components/Layout.vue"
import ActionBarWithBackButton from "../components/ActionBarWithBackButton.vue"
import TimePickerModal from "../components/TimePickerModal.vue"
import TextFieldWithLabelAndError from "../components/TextFieldWithLabelAndError.vue"
import App from "../App.vue"
import sessionForm from "../../../mixins/sessionForm"
import store from "../../../data/store"

import { getCSRFToken, makeAlert } from "../utils"

export default {
  data() {
    const years = getYearsList()
    const months = getMonths()
    const days = getDaysOfGivenYearAndMonth(store.state.selectedDate.year, store.state.selectedDate.month)
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

  mixins: [sessionForm],

  components: {
    ActionBarWithBackButton,
    Layout,
    TextFieldWithLabelAndError,
  },

  methods: {
    getCSRFToken,

    selectDateNative() {
      const { year, month, day } = this.selectedDate
      this.$showModal(DatePickerModal, { props: { year, month, day }})
    },

    selectTimeNative() {
      const { hour, minute } = this.selectedTime
      this.$showModal(TimePickerModal, { props: { hour, minute }})
    },

    redirectCallback() {
      this.$navigateTo(App, { props: { tab: 2 }})
    },

    errorCallback(message) {
      makeAlert(message)
    },

    focusInput(inputItem) {
      this.$refs[inputItem].nativeView.focus()
    },
  }
}
</script>
