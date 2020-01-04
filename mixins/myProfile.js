import { validatePassword, validateUserForm } from "../utils/common"
import { whoAmI, updateUser, changeUserPassword } from "../data/users"
import store from "../data/store"
export default {
  name: "my-profile",
  data() {
    return {
      name: "",
      email: "",
      currentUser: store.state.currentUser,
      password: "",
      confirmPassword: "",
      passwordFormError: null,
      userFormError: null,
      generalErrUserForm: false,
      generalErrPasswordForm: false,
    }
  },

  created() {
    this.getCSRFToken()
    store.setIsLoading("currentUser")
    this.getMyInfo()
  },

  methods: {
    getMyInfo(args) {
      whoAmI().then((res) => {
        const { name, email } = res
        this.name = name
        this.email = email
        store.setCurrentUser(res)
        // store.setIsLoading("currentUser", false)
        if (args) {
          args.object.refreshing = false
        }
      })
    },

    editUser() {
      const { name, email } = this
      const { error } = validateUserForm({ email, hasName: true, name })

      if (error) {
        this.userFormError = error
        return
      }

      this.userFormError = null

      store.setIsLoading("currentUser")
      const payload = { name, email }
      updateUser({ payload })
        .then(() => {
          store.setCurrentUser({ name, email })
          const message = "Profile updated."
          this.generalErrUserForm = false
          this.successCallback && this.successCallback(message)
        })
        .catch(() => {
          const message = "Update unsuccessful. Try again."
          this.generalErrUserForm = message
        }).finally(() => {
          store.setIsLoading("currentUser", false)
        })
    },

    resetPassword() {
      const { password, confirmPassword } = this

      const { error } = validatePassword({ password, hasConfirm: true, confirmPassword })

      if (error) {
        this.passwordFormError = error
        return
      }

      this.passwordFormError = null

      store.setIsLoading("currentUser")

      const payload = { password }
      changeUserPassword({ payload }).then(() => {
        const message = "Password updated."
        this.password = ""
        this.confirmPassword = ""
        this.generalErrPasswordForm = false
        this.successCallback && this.successCallback(message)
      }).catch(() => {
        const message = "Password change unsuccessful. Try again."
        this.generalErrPasswordForm = message
      }).finally(() => {
        store.setIsLoading("currentUser", false)
      })
    },
  },
}