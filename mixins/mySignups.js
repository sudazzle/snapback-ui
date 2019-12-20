import { stringToDateTime, getTime } from "../utils/common"
import store from "../data/store"
import { getSessionSignups, cancelSessionSignup } from "../data/sessions"

export default {
  name: "signups",
  data() {
    return {
      signups: store.state.mySignups,
    }
  },

  computed: {
    hasSignups() {
      return (this.signups.data.length > 0)
    },
  },

  methods: {
    stringToDateTime,
    getTime,

    getSignups(args) {
      let pullRefresh
      if (args) {
        pullRefresh = args.object
      }

      store.setIsLoading("mySignups")

      getSessionSignups().then((sessions) => {
        store.setMySessionSignups(sessions)
        if (pullRefresh) {
          pullRefresh.refreshing = false
        }
      })
    },

    cancelSignup(id) {
      store.setIsLoading("mySignups")

      cancelSessionSignup({ id }).then(() => {
        getSessionSignups().then((sessions) => {
          store.setMySessionSignups(sessions)
          this.cancelSuccessCallback && this.cancelSuccessCallback()
        })
      }).catch((err) => {
        console.log("err", err)
        this.cancelErrorCallback && this.cancelErrorCallback()
        store.setIsLoading("mySignups", false)
      })
    }
  },
}