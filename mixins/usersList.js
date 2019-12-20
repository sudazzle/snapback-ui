import { getUsers, deleteUserById } from "../data/users"
import store from "../data/store"
export default {
  name: 'userslist',

  data() {
    return {
      users: store.state.users,
      deleteItem: -1,
    }
  },

  methods: {
    _getUsers() {
      store.setIsLoading("users")
      getUsers().then((users) => {
        store.setUsers(users)
      })
    },

    deleteUser() {
      deleteUserById({ id: this.deleteItem }).then(() => {
        this._getUsers()
        this.successCallback && this.successCallback()
      }).catch((err) => {
        console.log("err", err)
        this.errorCallback && this.errorCallback()
      })
    },
  },
}
