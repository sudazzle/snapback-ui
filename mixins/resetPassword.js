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
      })
      .finally(() => {
        store.setIsLoading("currentUser", false)
      })
    },
  }
}