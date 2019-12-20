import { getNextSessions, getSessionSignups, signUp } from "../data/sessions"
import { stringToDateTime, getTime } from "../utils/common"
import store from "../data/store"

export default {
  data() {
    return {
      sessions: store.state.nextSessions,
      signups: store.state.mySignups,
    }
  },

  computed: {
    hasAllSignups: function () {
      const { sessions, signups } = this
      return (
        sessions.data.length > 0 &&
        signups.data.length > 0 &&
        sessions.data.length === signups.data.length
      )
    },

    hasSessions: function () {
      return (this.sessions.data.length > 0)
    }
  },

  methods: {
    stringToDateTime,
    getTime,

    isSessionOwner(user_id) {
      return (this.userID === user_id)
    },

    hasSignedUpForThisSession(session_id) {
      return this.signups.data.find(s => {
        return (s.session_id === session_id)
      })
    },

    fetchSessionsAndSignups(pullRefresh) {

      if (!pullRefresh) {
        store.setIsLoading("nextSessions")
        store.setIsLoading("mySignups")
      }

      getNextSessions().then((sessions) => {
        store.setNextSessions(sessions)
      })

      getSessionSignups().then((sessions) => {
        store.setMySessionSignups(sessions)
        if (pullRefresh) {
          pullRefresh.refreshing = false
        }
      })
    },

    signUpHandler(session_id) {
      store.setIsLoading("nextSessions")
      store.setIsLoading("mySignups")

      const payload = { session_id }
      signUp({ payload })
        .then(() => {
          this.fetchSessionsAndSignups()
          this.signupSuccessCallback && this.signupSuccessCallback()
        }).catch(() => {
          store.setIsLoading("nextSessions", false)
          store.setIsLoading("mySignups", false)
        })
    },
  },
}