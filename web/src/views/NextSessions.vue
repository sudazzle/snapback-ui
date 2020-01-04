<template>
  <div class="next-sessions">
    <h2>Next Snapback Sessions</h2>
    <Loading v-if="sessions.isLoading || signups.isLoading" />
    <div v-else>
      <div v-for="session in sessions.data" :key="session.ID + 'session'">
        <b-jumbotron :header="session.title" :lead="stringToDateTime(session.date_n_time)">
          <p v-if="session.description !== ''">{{session.description}}</p>
          <b-button
            v-if="!isSessionOwner(session.user_id) && !hasSignedUpForThisSession(session.ID)"
            size="lg"
            variant="danger"
            @click.once="signUpHandler(session.ID)"
          >Sign up</b-button>
          <b-badge variant="light" style="font-size: 1.2rem; font-weight: normal;" v-if="isSessionOwner(session.user_id)">You are the trainer</b-badge>
          <b-badge v-if="hasSignedUpForThisSession(session.ID)">Already signed up</b-badge>
        </b-jumbotron>
      </div>
      <b-jumbotron v-if="!hasSessions" lead="There are no upcoming training sessions yet." />
    </div>
  </div>
</template>
<script>
  import nextSessionsMixins from "../../../mixins/nextSessions"
  import Loading from "../components/Loading.vue"
  import { getCSRFToken, makeToast } from "../utils"
  import store from "../../../data/store"
  export default {
    data() {
      return {
        userID: store.state.currentUser.data.ID
      }
    },

    components: {
      Loading,
    },

    created() {
      getCSRFToken()
      this.fetchSessionsAndSignups()
    },

    mixins: [nextSessionsMixins],
    methods: {
      makeToast,
      signupSuccessCallback() {
        this.makeToast("success", "You have signed up for the training session.")
      }
    }
  }
</script>