import store from "../data/store"
import { deleteSession, getSessions } from "../data/sessions"

export default {
  name: "sessions",

  data() {
    return {
      sessions: store.state.sessions,
      deleteItem: -1,
    }
  },

  computed: {
    hasSessions() {
      return this.sessions.data.length > 0
    }
  },

  methods: {
    getSessions() {
      store.setIsLoading("sessions")

      getSessions().then((sessions) => {
        store.setSessions(sessions)        
      })
    },

    cancelSession(id) {},

    deleteSession() {
      store.setIsLoading("sessions")

      deleteSession({ id: this.deleteItem }).then(() => {
        this.getSessions()
        this.deleteSuccessCallback && this.deleteSuccessCallback()
      }).catch(() => {
        this.deleteErrorCallback && this.deleteErrorCallback()
      })
    },
  },
}