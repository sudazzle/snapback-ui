import { createNewUser } from "../data/users"
import { validateUserForm, validatePassword } from "../utils/common"

import store from "../data/store"
export default {
  name: "register",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordFormError: null,
      userFormError: null,
      generalErr: null,
      currentUser: store.state.currentUser,
      backend: store.state.backEnd
    }
  },  

  methods: {
    register() {
      const { name, email, password, confirmPassword } = this
      const { error: userFormErr } = validateUserForm({ email, name })

      if (userFormErr) {
        this.userFormError = userFormErr
        return
      }

      this.userFormError = null

      const { error: passErr } = validatePassword({ password, confirmPassword })

      if (passErr) {
        this.passwordFormError = passErr
        return
      }

      this.passwordFormError = null
      
      const payload = { name, email, password, password }

      store.setIsLoading("currentUser")
      createNewUser({ payload }).then(() => {
        this.generalErr = null
        if (!store.state.backEnd.errorForPage) {
          this.registerSuccessCallback()
        }
      }).finally(() => {
        store.setIsLoading("currentUser", false)
      })
    },   
  },
}