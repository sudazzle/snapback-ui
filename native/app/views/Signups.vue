<template>
  <Layout :isLoading="signups.isLoading">
    <PullToRefresh left="0" top="0" width="100%" height="100%" @refresh="getSignups">
      <ScrollView width="100%" height="100%">
        <NoDataMessage v-if="backend.errorForLayout" :message="backend.errorForLayout" />
        <StackLayout v-else-if="hasSignups" class="p-y-10">
          <StackLayout
            class="m-x-15 m-y-5 p-20 sessions"
            v-for="signup in signups.data" 
            :key="'signup' + signup.signup_id"
          >
            <Label class="h2 snapback-primary-text text-center font-weight-bold" :text="signup.title" />
            <Label
                color="#3D586D"
                class="h3 text-center font-weight-bold"
                :text="stringToDateTime(signup.date_n_time) + ' ' + getTime(signup.date_n_time)"
              />
              <Label
                v-if="signup.description !== ''"
                color="#888"
                class="h4 text-center p-10"
                textWrap="true"
                :text="signup.description"
              />
              <Button
                :isEnabled="!signups.isLoading"
                fontSize="20"
                height="55"
                width="200"
                textTransform="uppercase"
                class="bg-primary -rounded-sm snapback-primary-bg"
                @tap="cancelSignup(signup.signup_id)"
              >Cancel Sign up</Button>
              <Label class="text-center" color="#ff0000" v-if="signup.status === 'waiting'">You are number {{ signup.queue_no }} in the queue.</Label>
          </StackLayout>
        </StackLayout>
        <NoDataMessage v-else message="You have not signed up for any sessions." />
      </ScrollView>
    </PullToRefresh>
  </Layout>
</template>
<script>
import Layout from "../components/Layout.vue"
import NoDataMessage from "../components/NoDataMessage.vue"
import store from "../../../data/store"

import mySignups from "../../../mixins/mySignups"

export default {
  mixins: [mySignups],

  data() {
    return {      
      backend: store.state.backEnd
    }
  },

  components: {
    Layout,
    NoDataMessage,
  },
};
</script>
