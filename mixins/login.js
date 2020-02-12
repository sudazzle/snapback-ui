import store from "../data/store"
import { validatePassword, validateUserForm } from "../utils/common"
import { logIn, resetPassword } from "../data/users"

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
      err: false,
      passwordFormError: null,
      userFormError: null,
      currentUser: store.state.currentUser,
    }
  },

  methods: {
    resetPassword() {
      const payload = {
        email: this.email
      }

      resetPassword({ payload }).then(() => {
        console.log("got here")
      })
    },

    submit() {
      const { email, password } = this
      const { error: userFormErr } = validateUserForm({ email, hasName: false })

      if (userFormErr) {
        this.userFormError = userFormErr
        return
      }

      this.userFormError = null

      const { error: passErr } = validatePassword({ password, hasConfirm: false })

      if (passErr) {
        this.passwordFormError = passErr
        return
      }

      this.passwordFormError = null

      const payload = { email, password }

      store.setIsLoading("currentUser")
      logIn({ payload })
        .then((user) => {
          console.log("user", user)
          this.err = false
          store.setAuthHeader(user.token)
          this.loginSuccesCallback(user)
        })
        .catch((err) => {
          console.log("err", err)
          this.err = err.response.status ? err.response.data.message : "Internet Connection Error."
        })
        .finally(() => {
          store.setIsLoading("currentUser", false)
        })
    },
  }
}