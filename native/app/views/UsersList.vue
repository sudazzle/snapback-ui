<template>
  <Layout
    addButton="true"
    :noDataMessage="noDataMessage"
    :isLoading="users.isLoading"
    @refresh="onPullToRefreshInitiated"
    @itemAddEvent="goToAddUser"
  >
    <RadListView
      for="item in users.data"
      swipeActions="true"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
      @itemSwipeProgressStarted="onSwipeStarted"
      loadOnDemandMode="Manual"
      @loadMoreDataRequested="onLoadMoreItemsRequested"
      @itemTap="gotoUserUpdatePage">
      <v-template>
        <StackLayout
          class="item"
          backgroundColor="white"
          marginTop="0"
          borderBottomWidth="1"
          borderBottomColor="#ddd"
          orientation="vertical"
        >
          <Label :text="item.name" class="nameLabel"></Label>
          <Label fontSize="12px" :text="item.email" class="snpaback-secondary-text"></Label>
        </StackLayout>
      </v-template>
      <v-template name="itemswipe">
        <GridLayout columns="*, auto" backgroundColor="white" padding="0">
          <StackLayout
            backgroundColor="red"
            id="delete-btn"
            @tap="confirmDeleteNative"
            color="white" col="2"
            orientation="horizontal"
          >
            <Label text="delete" verticalAlignment="center" horizontalAlignment="center" />
          </StackLayout>
        </GridLayout>
      </v-template>
    </RadListView>      
  </Layout>
</template>

<script>
import CreateNEditUser from "./CreateNEditUser.vue"
import Layout from "../components/Layout.vue"
import store from "../../../data/store"
import usersList from "../../../mixins/usersList"
import { getUsers } from "../../../data/users"

export default {
  data() {
    return {
      backend: store.state.backEnd
    }
  },

  computed: {
    noDataMessage() {
      return {
        message: "No users.",
        show: !this.hasUsers
      }
    }
  },

  components: { Layout },

  mixins: [usersList],

  methods: {
    onSwipeStarted ({ data, mainView, swipeView, index }) {
      if (!this.users.isLoading) {
        const item = mainView.bindingContext
        const deleteItem = swipeView.getViewById("delete-btn")
        const swipeLimits = data.swipeLimits

        swipeLimits.right = deleteItem.getMeasuredWidth()
        swipeLimits.threshold = deleteItem.getMeasuredWidth() / 2
      }
    },

    onLoadMoreItemsRequested({ object }) {
      const { limit, users } = this
      const pageNo = users.currentPage + 1
      getUsers({ limit, page: pageNo }).then((users) => {
        store.setUsers(users, pageNo)  
        object.notifyLoadOnDemandFinished()
      })
    },

    onPullToRefreshInitiated({ object }) {
      const { limit } = this
      // this.currentPage = 1
      getUsers({ limit, page: 1 }).then((users) => {
        store.resetUsers()
        store.setUsers(users, 1)
      }).finally(() => {
        if (object.refreshing) {
          object.refreshing = false
        } else {
          object.notifyPullToRefreshFinished()
        }
      })
    },

    confirmDeleteNative({ object }) {
      this.deleteItem = object.bindingContext.ID
      confirm("Want to delete this user?")
        .then(result => {
          if (result) {
            this.deleteUser()
          }
        })
    },    

    goToAddUser() {
      this.$navigateTo(CreateNEditUser)
    },

    successCallback(id) {
      store.removeUser(id)
    },

    gotoUserUpdatePage(user) {
      this.$navigateTo(CreateNEditUser, { props: { isUpdate: true, userId: user.item.ID }})
    },
  },
}
</script>
