import store from "../data/store"
import { validatePassword, validateUserForm } from "../utils/common"
import { logIn, resetPassword } from "../data/users"

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
      err: store.state.backEnd,
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
          if (user) {
            store.setAuthHeader(user.token)
            store.setCurrentUser(user)
            store.setBackendError(false, false)
            this.loginSuccesCallback(user)
          }
        })
        .finally(() => {
          setTimeout(() => {
            store.setIsLoading("currentUser", false)
          }, 1000)
        })
    },
  }
}