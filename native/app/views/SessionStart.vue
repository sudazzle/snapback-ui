<template>
  <Page class="page">
    <ActionBarWithBackButton :processing="fetching" title="Start Session" />
      <Layout :isLoading="fetching">
        <AbsoluteLayout>
          <NoDataMessage top="0" left="0" width="100%" height="100%" v-if="!hasSignupUsers" message="No signed up members." />
          <FlexboxLayout
            paddingTop="8"
            paddingBottom="8"
            height="80"
            justifyContent="space-between"
          >
            <Button
              col="0"
              width="160"
              v-if="hasSignupUsers"
              :text="isSelectAllChecked ? 'Unselect All' : 'Select All'"
              @tap="selectAll"
            />
            <Button
              class="-primary"
              col="1"
              width="200"
              v-if="selectedUsers.length > 0"
              text="Approve Attendence"
              @tap="approve"
            />
          </FlexboxLayout>
          <ListView
            ref="listviewsnapback"
            v-if="hasSignupUsers"
            top="80"
            left="0"
            width="100%"
            height="97%"
            for="item in signedupUsers"
            @itemTap="onItemTap"
          >
            <v-template>
              <CheckBox
                :id="'checkbox-'+item.signup_id"
                class="p-x-15 p-y-35 snapback-primary-text"
                :text="item.user_name"
                @checkedChange="addRemoveUser(item.signup_id)"
              ></CheckBox>
            </v-template>
          </ListView>
        </AbsoluteLayout>
      </Layout>
  </Page>
</template>
<script>
import ActionBarWithBackButton from "../components/ActionBarWithBackButton.vue"
import App from "../App.vue"
import Layout from "../components/Layout.vue"
import NoDataMessage from "../components/NoDataMessage.vue"
import sessionStartMixins from "../../../mixins/sessionStart"

export default {
  components: {
    ActionBarWithBackButton,
    Layout,
    NoDataMessage,
  },

  mixins: [sessionStartMixins],

  methods: {
    toggleCheckbox(id) {
      const checkBox = this.$refs.listviewsnapback.nativeView.getViewById("checkbox-" + id)
      checkBox.toggle()
    },

    selectAll() {
      if (!this.isSelectAllChecked) {
        this.signedupUsers.forEach(s => {
          if (this.selectedUsers.indexOf(s.signup_id) < 0) {
            this.toggleCheckbox(s.signup_id)
          }
        })
      } else {
        this.signedupUsers.forEach(s => {
          this.toggleCheckbox(s.signup_id)
        })

        this.selectedUsers = []
      }
    },

    approveSuccessCallback() {
      makeAlert(this.alertMsg.text)
      this.$navigateTo(App, { props: { tab: 2 }})
    },
  },
}
</script>

