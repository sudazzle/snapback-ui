<template>
  <div class="next-sessions">
    <h2>Next Snapback Sessions</h2>
    <Loading v-if="sessions.isLoading || signups.isLoading" />
    <div v-else>
      <div v-for="session in sessions.data" :key="session.id + 'session'">
        <b-jumbotron :header="session.title" :lead="stringToDateTime(session.date_n_time)">
          <p v-if="session.description !== ''">{{session.description}}</p>
          <p 
            style="font-size: 1.1rem; font-weight: bold; color: red;"
            v-if="session.signups >= session.max_participants && !hasSignedUpForThisSession(session.id)"
          >
            <span v-if="session.signups - session.max_participants === 0">Signup to be first in the waiting list.</span>
            <span else>{{session.signups - session.max_participants}} people in the waiting list.</span>
          </p>
          <b-button
            v-if="!isSessionOwner(session.user_id) && !hasSignedUpForThisSession(session.id)"
            size="lg"
            variant="danger"
            @click.once="signUpHandler(session.id)"
          >Sign up</b-button>
          <b-badge variant="light" style="font-size: 1.2rem; font-weight: normal;" v-if="isSessionOwner(session.user_id)">You are the trainer</b-badge>
          <b-badge v-if="hasSignedUpForThisSession(session.id)">Already signed up</b-badge>
        </b-jumbotron>
      </div>
      <b-jumbotron v-if="!hasSessions" lead="There are no upcoming training sessions yet." />
    </div>
  </div>
</template>
<script>
  import nextSessionsMixins from "../../../mixins/nextSessions"
  import Loading from "../components/Loading.vue"
  import { makeToast } from "../utils"
  import store from "../../../data/store"

  export default {
    data() {
      return {
        userID: store.state.currentUser.data.ID,
        backendError: store.state.backEnd.error
      }
    },

    components: {
      Loading,
    },

    created() {
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