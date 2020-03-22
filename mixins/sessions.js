import store from "../data/store"
import { deleteSession, getSessions } from "../data/sessions"

export default {
  name: "sessions",

  data() {
    return {
      pages: [],
      sessions: store.state.sessions,
      deleteItem: -1,
      limit: 15,
    }
  },

  computed: {
    hasSessions() {
      return this.sessions.data.length > 0
    }
  },

  methods: {
    getSessions({ page = 1, isLoading = true, callback }) {
      const { limit } = this

      isLoading && store.setIsLoading("sessions")

      getSessions({ limit, page }).then((sessions) => {
        this.pages[page] = sessions
        store.setSessions(sessions)
        callback && callback()
      }).finally(() => {
        store.setIsLoading("sessions", false)
      })
    },

    deleteSession() {
      store.setIsLoading("sessions")

      deleteSession({ id: this.deleteItem }).then(() => {
        this.deleteSuccessCallback && this.deleteSuccessCallback(this.deleteItem)
      }).catch((err) => {
        this.deleteErrorCallback && this.deleteErrorCallback()
      }).finally(() => {
        store.setIsLoading("sessions", false)
      })
    },
  },
}