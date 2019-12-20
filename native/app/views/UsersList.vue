<template>
  <Layout addButton="true" :isLoading="users.isLoading" @itemAddEvent="goToAddUser">
    <NoDataMessage v-if="users.data.length < 0 && !users.isLoading" message="No users." />
    <RadListView else ref="listView"
        for="item in users.data"
        swipeActions="true"
        pullToRefresh="true"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
        @itemSwipeProgressStarted="onSwipeStarted"
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
  components: { Layout },

  data() {
    return {
      users: store.state.users,
      deleteItem: -1,
    }
  },

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

    onPullToRefreshInitiated({ object }) {
      getUsers().then((users) => {
        store.setUsers(users)
        object.notifyPullToRefreshFinished()
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

    gotoUserUpdatePage(user) {
      this.$navigateTo(CreateNEditUser, { props: { isUpdate: true, userId: user.item.ID }})
    },
  },
}
</script>
