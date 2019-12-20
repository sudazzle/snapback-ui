<template>
  <Layout :isLoading="sessions.isLoading || signups.isLoading">
    <NoDataMessage v-if="!hasSessions && !sessions.isLoading && !signups.isLoading" message="No trainning sessions yet." />   
    <PullToRefresh else @refresh="getSessionsInfo">
      <ScrollView :isScrollEnabled="!sessions.isLoading || !signups.isLoading" width="100%" height="100%">
        <StackLayout class="p-y-10">
          <StackLayout
            class="m-x-15 m-y-5 p-30 sessions"
            v-for="session in sessions.data" 
            :key="'session' + session.ID"
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
            <Button
              :isEnabled="!sessions.isLoading && !signups.isLoading"
              fontSize="20"
              height="55"
              width="140"
              textTransform="uppercase"
              backgroundColor="#DC2B7B"
              class="bg-primary -rounded-sm"
              v-if="!isSessionOwner(session.user_id) && !hasSignedUpForThisSession(session.ID)"
              @tap="signUpHandler(session.ID)"
            >Sign up</Button>
            <Label
              class="bg-primary text-center badge"
              textWrap="true"
              variant="info"
              v-if="isSessionOwner(session.user_id)"
            >Owner</Label>
            <Label
              width="180"
              borderRadius="50%"
              padding="7"
              borderColor="#aaa"
              color="#aaa"
              borderWidth="1"
              class="text-center"
              v-if="hasSignedUpForThisSession(session.ID, session.title)"
            >Already signed up</Label>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </PullToRefresh>
  </Layout>
</template>
<script>
import Layout from "../components/Layout.vue"
import NoDataMessage from "../components/NoDataMessage.vue"
import nextSessions from "../../../mixins/nextSessions"

import { getUserInfo } from "../utils"
import store from "../../../data/store"

export default {
  data() {
    const user = JSON.parse(getUserInfo())
    return {      
      userID: user.ID,
    }
  },

  components: {
    Layout,
    NoDataMessage,
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
  },
}
</script>

