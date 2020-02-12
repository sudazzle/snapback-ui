<template>
  <div class="next-sessions">
    <h2>My Signed up Sessions</h2>
    <Loading v-if="signups.isLoading" />
    <div v-else>
      <div v-for="signup in signups.data" :key="signup.signup_id + 'signup'">
        <b-jumbotron
          :header="signup.title"
          :lead="stringToDateTime(signup.date_n_time) + ' ' + getTime(signup.date_n_time)"
        >
          <p style="font-size: 1.1rem; font-weight: bold; color: red;" v-if="signup.status === 'waiting'">You are number {{ signup.queue_no }} in the queue.</p>
          <b-button size="lg" variant="primary" @click.once="cancelSignup(signup.signup_id)">Cancel</b-button>
        </b-jumbotron>
      </div>
      <b-jumbotron
        v-if="!hasSignups"
        lead="You have not signed up for any sessions."
      />
    </div>
  </div>
</template>
<script>
  import Loading from "../components/Loading.vue"
  import signupsMixins from "../../../mixins/mySignups"
  import { makeToast } from "../utils"
  
  export default {
    mixins: [signupsMixins],
    created() {
      this.getSignups()
    },

    components: {
      Loading,
    },

    methods: {
      makeToast,

      cancelSuccessCallback() {
        this.makeToast("success", "Session signup cancelled.")
      },

      cancelErrorCallback() {
        this.makeToast("danger", "Something went wrong. Please try again.")
      },
    }
  }
</script>