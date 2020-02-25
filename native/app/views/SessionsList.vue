<template>
  <Layout addButton="true" :isLoading="sessions.isLoading" @itemAddEvent="goToAddSession">
    <PullToRefresh
      width="100%"
      height="100%"
      v-if="backend.errorForLayout || (!hasSessions && !sessions.isLoading)"
      @refresh="onPullToRefreshInitiated"
    >
      <NoDataMessage v-if="backend.errorForLayout" :message="backend.errorForLayout" />
      <NoDataMessage v-else message="No sessions yet." />
    </PullToRefresh>
    <RadListView v-else
        for="item in sessions.data"
        swipeActions="true"
        pullToRefresh="true"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
        @itemSwipeProgressStarted="onSwipeStarted"
        loadOnDemandMode="Manual"
        @loadMoreDataRequested="onLoadMoreItemsRequested"
        @itemTap="editSessionNative">
      <v-template>
        <StackLayout
          class="item"
          backgroundColor="white"
          marginTop="0"
          borderBottomWidth="1"
          borderBottomColor="#ddd"
          orientation="vertical"
        >
          <Label :text="item.title" class="nameLabel snapback-primary-text"></Label>
          <Label fontSize="12px" :text="stringToDateTime(item.date_n_time)" class="snpaback-secondary-text"></Label>
        </StackLayout>
      </v-template>
      <v-template name="itemswipe">
        <GridLayout columns="*, auto, auto, auto" backgroundColor="white" padding="0">
          <StackLayout
            backgroundColor="#3498DB"
            id="cancel-btn"
            color="white"
            col="1"
            orientation="horizontal"
          >
            <Label width="60" textAlignment="center" text="cancel" verticalAlignment="center" horizontalAlignment="center" />
          </StackLayout>
          <StackLayout
            id="start-btn"
            color="white"
            col="2"
            @tap="startSessionNative"
            orientation="horizontal"
            backgroundColor="#F1C40F"
          >
            <Label width="60" textAlignment="center" text="Start" verticalAlignment="center"  horizontalAlignment="center" />
          </StackLayout>
          <StackLayout
            backgroundColor="#E74C3C"
            id="delete-btn"
            @tap="confirmDeleteNative"
            color="white"
            col="3"
            orientation="horizontal"
          >
            <Label width="60" textAlignment="center" text="delete" verticalAlignment="center" horizontalAlignment="center" />
          </StackLayout>
        </GridLayout>
      </v-template>
    </RadListView>      
  </Layout>
</template>
<script>
import { getSessions } from "../../../data/sessions"
import store from "../../../data/store"
import NoDataMessage from "../components/NoDataMessage.vue"
import CreateSession from "./SessionForm.vue"
import Layout from "../components/Layout.vue"
import { stringToDateTime } from "../../../utils/common"
import SessionStart from "./SessionStart.vue"
import sessions from "../../../mixins/sessions"

export default {
  data() {
    return {
      backend: store.state.backEnd
    }
  },

  components: { Layout, NoDataMessage },

  mixins: [sessions],

  methods: {
    stringToDateTime,

    goToAddSession() {
      this.$navigateTo(CreateSession, { props: { isCreate: true }})
    },

    onLoadMoreItemsRequested({ object }) {
      const { limit, sessions } = this
      const pageNo = sessions.currentPage + 1
      getSessions({ limit, page: pageNo }).then((sessions) => {
        store.setSessions(sessions, pageNo)  
        object.notifyLoadOnDemandFinished()
      })
    },

    onSwipeStarted ({ data, mainView, swipeView, index }) {
      if (!this.sessions.isLoading) {
        const item = mainView.bindingContext
        const cancelItem = swipeView.getViewById("cancel-btn")
        const deleteItem = swipeView.getViewById("delete-btn")
        const startItem = swipeView.getViewById("start-btn")
        const swipeLimits = data.swipeLimits

        swipeLimits.right = cancelItem.getMeasuredWidth() + deleteItem.getMeasuredWidth() + startItem.getMeasuredWidth()
        swipeLimits.threshold = cancelItem.getMeasuredWidth()
        
        if (item.status !== "next") {
          cancelItem.backgroundColor = "#ddd"
          deleteItem.backgroundColor = "#ddd"
          startItem.backgroundColor = "#ddd"
        }
      }
    },

    onPullToRefreshInitiated({ object }) {
      const { limit } = this
      // this.currentPage = 1
      getSessions({ limit, page: 1 }).then((sessions) => {
        store.resetSessions()
        store.setSessions(sessions, 1)  
      }).finally(() => {
        if (object.refreshing) {
          object.refreshing = false
        } else {
          object.notifyPullToRefreshFinished()
        }
      })
    },

    editSessionNative({ item }) {
      this.$navigateTo(CreateSession, { props: { session_id: item.ID }})
    },

    startSessionNative({ object }) {
      this.$refs.listView.nativeView.notifySwipeToExecuteFinished()
      this.$navigateTo(SessionStart, { props: { sessionId: object.bindingContext.ID }})
    },

    confirmDeleteNative({ object }) {
      this.deleteItem = object.bindingContext.ID
      confirm("Want to delete this session?")
        .then(result => {
          if (result) {
            this.deleteSession()
          }
        })
    },
  },
}
</script>
