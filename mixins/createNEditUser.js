import { createNewUser, updateUser, getUserById, changeUserPassword } from "../data/users"
import { validatePassword, validateUserForm } from "../utils/common"
import store from "../data/store"

export default {
  name: "create-edit-user",

  props: ["isUpdate", "userId"],

  created() {
    if (this.isUpdate) {
      this.processing = true
      this._getUserById()
    }
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "user",
      lastRole: false,
      processing: false,
      passwordFormError: null,
      userFormError: null,
      generalErrUserForm: false,
      generalErrPasswordForm: false,
      backend: store.state.backEnd
    }
  },

  methods: {
    _getUserById(args) {
      let id = this.userId

      if (this.$route && this.$route.params.id) {
        id = this.$route.params.id
      }

      getUserById({ id }).then(({ name, email, role }) => {
        this.name = name
        this.email = email
        this.role = role
        this.processing = false
      }).finally(() => {
        if (args) {
          args.object.refreshing = false
        }
      })
    },

    resetpassword() {
      const { password, isUpdate } = this

      if (isUpdate) {
        const { error } = validatePassword({ password, hasConfirm: false })

        if (error) {
          this.passwordFormError = error
          return
        }

        this.passwordFormError = null
      }

      const id = this.userId || this.$route.params.id
      const payload = { password }
      this.processing = true
      changeUserPassword({ payload, id }).then(() => {
        const message = "Password reset successful."
        this.password = ""
        this.generalErrPasswordForm = false
        this.successCallback && this.successCallback(message)
      }).catch(() => {
        const message = "Password reset unsuccessful. Try again."
        this.generalErrPasswordForm = this.backend.errorForPage || message
        // this.errorCallback && this.errorCallback(this.generalErrPasswordForm)
      }).finally(() => {
        this.processing = false
      })
    },

    submit() {
      const { name, email, role, password, isUpdate } = this
      const payload = {
        name,
        email,
        role,
      }

      if (!isUpdate) {
        payload.password = password
      }

      const { error: errorUserForm } = validateUserForm({ email, hasName: true, name })

      if (errorUserForm) {
        this.userFormError = errorUserForm
        return
      }

      this.userFormError = null

      if (!isUpdate) {
        const { error: errorPassword } = validatePassword({ password, hasConfirm: false })

        if (errorPassword) {
          this.passwordFormError = errorPassword
          return
        }

        this.passwordFormError = null
      }

      this.processing = true
      if (isUpdate) {
        const id = this.userId || this.$route.params.id
        updateUser({ payload, id }).then(() => {
          const message = "Member information updated."
          this.successCallback && this.successCallback(message)
        }).catch(() => {
          const message = "Update unsuccessful. Try again."
          this.generalErrPasswordForm = this.backend.errorForPage || message
          // this.errorCallback && this.errorCallback(this.generalErrPasswordForm)
        }).finally(() => {
          this.processing = false
        })
      } else {
        createNewUser({ payload }).then(() => {
          this.redirectCallback && this.redirectCallback()
        }).catch(() => {
          const message = "Member create unsuccessful. Try again."
          this.generalErrUserForm = this.backend.errorForPage || message
          // this.errorCallback && this.errorCallback(this.generalErrUserForm)
        }).finally(() => {
          this.processing = false
        })
      }
    },

    setValue(key, value) {
      this[key] = value
    },
  },
}