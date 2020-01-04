import store from "../data/store"
import { validateUserForm } from "../utils/common"
import { resetPassword } from "../data/users"

export default {
  name: "reset-password",

  data() {
    return {
      email: "",
      err: false,
      userFormError: null,
      currentUser: store.state.currentUser,
    }
  },

  created() {
    this.getCSRFToken()
  },

  methods: {
    submit() {
      const { email } = this
      const { error: userFormErr } = validateUserForm({ email, hasName: false })
      
      if (userFormErr) {
        this.userFormError = userFormErr
        return
      }

      const payload = {
        email: this.email
      }
      
      this.userFormError = null
      store.setIsLoading("currentUser")
      resetPassword({ payload }).then(() => {
        this.successCallback && this.successCallback()
      }).catch((err) => {
        this.err = err.response.status ? err.response.data.message : "Internet Connection Error."
      })
      .finally(() => {
        store.setIsLoading("currentUser", false)
      })
    },
  }
}