import { getUsers, deleteUserById } from "../data/users"
import store from "../data/store"
export default {
  name: 'userslist',

  data() {
    return {
      pages: [],
      users: store.state.users,
      deleteItem: -1,
      limit: 15,
    }
  },

  computed: {
    hasUsers() {
      return this.users.data.length > 0
    }
  },

  methods: {
    _getUsers({ page = 1, isLoading = true, callback }) {
      const { limit } = this

      isLoading && store.setIsLoading("users")
      
      getUsers({ limit, page }).then((users) => {
        this.pages[page] = users
        store.setUsers(users)
        callback && callback()
      })
    },

    deleteUser() {
      deleteUserById({ id: this.deleteItem }).then(() => {
        // this._getUsers()
        this.successCallback && this.successCallback()
      }).catch((err) => {
        console.log("err", err)
        this.errorCallback && this.errorCallback()
      })
    },
  },
}
