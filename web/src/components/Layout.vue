<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#" @click="browseLink($event, '/')">Snapback</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!-- <b-nav-item v-if="currentUser.data.role === 'admin'" @click="browseLink($event, '/dashboard')">Dashboard</b-nav-item> -->
            <b-nav-item @click="browseLink($event ,'/next-sessions')" >Next sessions</b-nav-item>
            <b-nav-item @click="browseLink($event ,'/my-signups')" >My signups</b-nav-item>
            <b-nav-item 
              v-if="currentUser.data.role === 'admin'"
              @click="browseLink($event ,'/users')"
            >Users</b-nav-item>
            <b-nav-item
              v-if="currentUser.data.role !== 'user' && currentUser.data.role !== ''"
              @click="browseLink($event, '/sessions')"
            >Sessions</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <strong>{{currentUser.data.name}}</strong>
              </template>
              <b-dropdown-item @click="browseLink($event, '/account-settings')">Profile</b-dropdown-item>
              <b-dropdown-item @click="logOut">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>
<script>
import store from "../../../data/store"
import { signOut } from "../utils"

export default {
  name: "layout",

  data() {
    return {
      currentUser: store.state.currentUser
    }
  },

  methods: {
    logOut() {
      signOut()
      this.$router.push({ path: "/login" })
    },

    browseLink(e, path) {
      e.preventDefault();
      if (this.$route.path !== path) {
        this.$router.push({ path });
      }
    },

    refreshHandler(args) {
      this.$emit("refreshList", args)
    }
  },
};
</script>
