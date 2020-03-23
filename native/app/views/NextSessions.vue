<template>
  <Layout
    pullToRefresh="true"
    :isLoading="sessions.isLoading || signups.isLoading"
    :noDataMessage="noDataMessage"
    @refresh="getSessionsInfo"
  >
    <StackLayout
      class="m-x-15 m-y-5 p-30 sessions"
      v-for="session in sessions.data" 
      :key="'session' + session.id"
    >
      <Label
        class="h2 snapback-primary-text text-center font-weight-bold"
        :text="session.title"
      />
      <Label
        color="#3D586D"
        class="h3 text-center font-weight-bold"
        :text="stringToDateTime(session.date_n_time) + ' ' + getTime(session.date_n_time)"
      />
      <Label
        v-if="session.description !== ''"
        color="#888"
        class="h4 text-center p-10"
        textWrap="true"
        :text="session.description"
      />
      <template 
        v-if="session.signups >= session.max_participants && !hasSignedUpForThisSession(session.id)"
      >
        <Label class="text-center" color="#ff0000" v-if="session.signups - session.max_participants === 0">Signup to be first in the waiting list.</Label>
        <Label class="text-center" color="#ff0000" else>{{session.signups - session.max_participants}} people in the waiting list.</Label>
      </template>
      <Button
        :isEnabled="!sessions.isLoading && !signups.isLoading"
        fontSize="20"
        height="55"
        width="140"
        textTransform="uppercase"
        backgroundColor="#DC2B7B"
        class="bg-primary -rounded-sm"
        v-if="!isSessionOwner(session.user_id) && !hasSignedUpForThisSession(session.id)"
        @tap="signUpHandler(session.id)"
      >Sign up</Button>

      <Label
        class="bg-primary text-center badge"
        textWrap="true"
        variant="info"
        v-if="isSessionOwner(session.user_id)"
      >Owner</Label>
      <Button
        :isEnabled="!sessions.isLoading && !signups.isLoading"
        fontSize="20"
        height="55"
        width="200"
        textTransform="uppercase"
        class="bg-primary -rounded-sm snapback-primary-bg"
        v-if="isSessionOwner(session.user_id)"
        @tap="startSessionNative(session.id)"
      >Start Session</Button>
      <Label
        width="180"
        borderRadius="50%"
        padding="7"
        borderColor="#aaa"
        color="#aaa"
        borderWidth="1"
        class="text-center"
        v-if="hasSignedUpForThisSession(session.id, session.title)"
      >Already signed up</Label>
    </StackLayout>
  </Layout>
</template>
<script>
import Layout from "../components/Layout.vue"
import nextSessions from "../../../mixins/nextSessions"
import SessionStart from "./SessionStart.vue"
import { getUserInfo } from "../utils"
import store from "../../../data/store"

export default {
  data() {
    const user = JSON.parse(getUserInfo())
    return {      
      userID: user.ID,
      backend: store.state.backEnd
    }
  },

  components: {
    Layout,
  },

  computed: {
    noDataMessage() {
      return {
        message: "No trainning sessions yet.",
        show: !this.hasSessions
      }
    }
  },

  mixins: [nextSessions],

  methods: {
    getSessionsInfo(args) {
      const pullRefresh = args.object

      if (!this.sessions.isLoading && !this.signups.isLoading) {
        this.fetchSessionsAndSignups(pullRefresh)
      } else {
        pullRefresh.refreshing = false
      }
    },

    startSessionNative(id) {
      this.$navigateTo(SessionStart, { props: { sessionId: id }})
    },
  },
}
</script>

