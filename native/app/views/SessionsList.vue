<template>
  <Layout
    addButton="true"
    :noDataMessage="noDataMessage"
    :isLoading="sessions.isLoading"
    @itemAddEvent="goToAddSession"
    @refresh="onPullToRefreshInitiated"
  >
    <RadListView
      ref="listView"
      for="item in sessions.data"
      swipeActions="true"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
      @itemSwipeProgressStarted="onSwipeStarted"
      :loadOnDemandMode="sessions.isLoading ? 'none' : 'Manual'"
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
        <GridLayout columns="*, auto, auto" backgroundColor="white" padding="0">
          <StackLayout
            id="start-btn"
            color="white"
            col="1"
            @tap="startSessionNative"
            orientation="horizontal"
            backgroundColor="#F1C40F"
          >
            <Label width="60" textAlignment="center" text="Start" verticalAlignment="center"  horizontalAlignment="center" />
          </StackLayout>
          <StackLayout
            backgroundColor="#3498DB"
            id="delete-btn"
            @tap="confirmDeleteNative"
            color="white"
            col="2"
            orientation="horizontal"
          >
            <Label width="60" textAlignment="center" text="cancel" verticalAlignment="center" horizontalAlignment="center" />
          </StackLayout>
        </GridLayout>
      </v-template>
    </RadListView>
  </Layout>
</template>
<script>
import { getSessions } from "../../../data/sessions"
import store from "../../../data/store"
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

  components: { Layout },

  computed: {
    noDataMessage() {
      return {
        message: "No sessions yet.",
        show: !this.hasSessions
      }
    }
  },

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
        const deleteItem = swipeView.getViewById("delete-btn")
        const startItem = swipeView.getViewById("start-btn")
        const swipeLimits = data.swipeLimits

        swipeLimits.right = deleteItem.getMeasuredWidth() + startItem.getMeasuredWidth()
        swipeLimits.threshold = deleteItem.getMeasuredWidth()
        
        if (item.status !== "next") {
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

    deleteSuccessCallback(id) {
      store.removeSession(id)
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
      confirm("Are you sure you want to cancel this session?")
        .then(result => {
          if (result) {
            this.deleteSession()
          }
        })
    },
  },
}
</script>
