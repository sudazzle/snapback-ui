<template>
  <Page class="page">
    <ActionBar backgroundColor="#f06eaa" class="action-bar">
      <GridLayout columns="3*, *" rows="*">
        <Label textAlignment="left" text="Snap-Back" column="0" row="0" />
        <Image
          horizontalAlignment="right"
          marginRight="15"
          column="1"
          row="0"
          width="30"
          height="30"
          @tap="goToUser"
          src="~/assets/user_icon.png"
          stretch="aspectFit"
        />
      </GridLayout>
    </ActionBar>
    <TabView
      tabBackgroundColor="#284154"
      tabTextFontSize="12"
      :selectedIndex="selectedIndex"
      @selectedIndexChange="indexChange"
      androidTabsPosition="bottom"
    >
      <TabViewItem  textTransform="none" title="Next Sessions">
        <NextSessions />
      </TabViewItem>
      <TabViewItem textTransform="none" title="My Signups">
        <Signups />
      </TabViewItem>
      <TabViewItem v-if="showTab(['admin', 'trainer'])" textTransform="none" title="All Sessions">
        <SessionsList />
      </TabViewItem>
      <TabViewItem v-if="showTab(['admin', 'trainer'])" textTransform="none" title="Users">
        <UsersList />
      </TabViewItem>
    </TabView>
  </Page>
</template>
<script>
  import NextSessions from "./views/NextSessions.vue"
  import MyProfile from "./views/MyProfile.vue"
  import Signups from "./views/Signups.vue"
  import SessionsList from "./views/SessionsList.vue"
  import UsersList from "./views/UsersList.vue"
  import { whoAmI, getUsers } from "../../data/users"
  import Loading from "./components/Loading.vue"
  import store from "../../data/store"
  import { getSessions, getNextSessions, getSessionSignups } from "../../data/sessions"
  import { getUserInfo, getCSRFToken } from "./utils"

  const firebase = require("nativescript-plugin-firebase")

  export default {
    name: "app",

    props: ["tab"],

    computed: {
      selectedIndex: {
        get: function() {
          return this.tab ? this.tab : 0
        },

        set: function() {}
      },
    },

    components: {
      NextSessions,
      Signups,
      SessionsList,
      UsersList,
      Loading,
    },

    methods: {
      indexChange: function(args) {
        getCSRFToken()
        
        let newIndex = args.value
        this.selectedIndex = newIndex

        if(newIndex === 0) {
          this.getAllSessionInfo()
        }

        if(newIndex === 1) {
          store.setIsLoading("mySignups")
          getSessionSignups().then((sessions) => {
            store.setMySessionSignups(sessions)
          })
        }

        if (newIndex === 2) {
          store.setIsLoading("sessions")
          getSessions().then(sessions => {
            store.setSessions(sessions)
          })
        }

        if (newIndex === 3) {
          store.setIsLoading("users")
          getUsers().then((users) => {
            store.setUsers(users)
          })
        }
      },

      showTab(roles) {
        const user = JSON.parse(getUserInfo())
        const roleExists = roles.find((role) => (role === user.role))
        
        if (roleExists) {
          return true
        }

        return false
      },

      goToUser() {
        this.$navigateTo(MyProfile)
      },

      getAllSessionInfo() {
        store.setIsLoading("nextSessions")
        store.setIsLoading("mySignups")

        getNextSessions().then((sessions) => {
          store.setNextSessions(sessions)
        })

        getSessionSignups().then((sessions) => {
          store.setMySessionSignups(sessions)
        })
      },
    },

    created() {
        // this.$refs.drawer.showDrawer()
      firebase.init({
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
        showNotifications: true,
        showNotificationsWhenInForeground: true,

        onPushTokenReceivedCallback: (token) => {
          console.log("[Firebase] onPushTokenReceivedCallback:", { token })
        },

        onMessageReceivedCallback: (message) => {
          console.log("[Firebase] onMessageReceivedCallback:", { message })
        },
      }).then(
        () => {
          console.log("firebase.init done")
        },
        (error) => {
          console.log(`firebase.init error: ${error}`)
        },
      ) 
    },
  }
</script>
