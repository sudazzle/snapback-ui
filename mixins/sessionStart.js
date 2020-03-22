import { startSession, getSignupsById } from "../data/sessions"
export default {
  name: "session-start",
  data() {
    return {
      fetching: false,
      signedupUsers: [],
      selectedUsers: [],
      alertMsg: {
        text: "",
        variant: "success",
      },
      dismissSecs: 5,
      dismissCountDown: 0,
    }
  },

  props: ["sessionId"],

  computed: {
    hasSignupUsers() {
      return this.signedupUsers.length > 0
    },

    isSelectAllChecked() {
      return this.signedupUsers.length > 0 && this.signedupUsers.length === this.selectedUsers.length
    }
  },

  created() {
    this.fetching = true
    this._getSignupsById()
  },

  methods: {
    _getSignupsById(args) {
      const id = this.sessionId || this.$route.params.id

      getSignupsById({ id })
        .then((users) => {
          this.signedupUsers = users
        }).finally(() => {
          this.fetching = false
          if (args.object) {
            args.object.refreshing = false
          }
        })
    },

    addRemoveUser(signup_id, e) {
      let enableCheck = true
      if (e) {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.type === "checkbox") {
          enableCheck = false
        }
      }

      if (enableCheck) {
        if (this.selectedUsers.indexOf(signup_id) >= 0) {
          this.selectedUsers = this.selectedUsers.filter(id => id !== signup_id)
        } else {
          this.selectedUsers.push(signup_id)
        }
      }
    },

    approve() {
      const id = this.sessionId || this.$route.params.id

      const payload = this.selectedUsers
      startSession({ payload, id })
        .then(() => {
          this.alertMsg.text = "Attendence checked and approved."
          this.approveSuccessCallback && this.approveSuccessCallback()
        })
        .catch(() => {
          this.alertMsg.text = "Something went wrong. Try agian."
          this.alertMsg.variant = "danger"
          this.approveErrorCallback && this.approveErrorCallback()
        })
    },
  },
}