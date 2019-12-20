<template>
  <div class="add-edit-session">
    <div v-if="hasSignupUsers">
      <h5>Start session and attendance check</h5>
      <p><b-button vagrant="primary" @click="selectAll">Select All</b-button></p>
      <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          v-bind:variant="alertMsg.variant"
          @dismiss-count-down="countDownChanged"
          >
              {{alertMsg.text}}
      </b-alert>
      <b-list-group>
        <b-list-group-item v-for="user in signedupUsers" v-bind:key="user.user_id + user.signup_id + 'signup'"  v-bind:class="{active: selectedUsers.indexOf(user.signup_id) >= 0}" @click="addRemoveUser(user.signup_id, $event)">
          <b-form-checkbox
            v-model="selectedUsers"
            v-bind:value="user.signup_id"
          >
            {{user.user_name}}
          </b-form-checkbox>
        </b-list-group-item>
      </b-list-group>
      <p>Click the Approve and Start Button to approve attendence and start the training session</p>
      <b-button variant="info" @click="approve">Approve & Start</b-button>
    </div>
    <div v-else>
      <h5>No signups for this sessions yet.</h5>
    </div>
  </div>
</template>
<script>
  import sessionStartMixins from "../../../mixins/sessionStart"
  export default {
    mixins: [sessionStartMixins],

    methods: {
      selectAll() {
        if (!this.isSelectAllChecked) {
          this.selectedUsers = this.signedupUsers.map(user => user.signup_id)
        } else {
          this.selectedUsers = []
        }
      },

      approveSuccessCallback() {
        showAlert()
      },

      approveErrorCallback() {
        showAlert()
      },

      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },

      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    }
  }
</script>