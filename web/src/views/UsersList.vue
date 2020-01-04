<template>
  <div class="snapback-list">
    <div class="page-header">
      <h4>Snapback members</h4>
       <b-button @click="$router.push({ path: '/users/create' })" variant="primary">Add members</b-button>
    </div>
    <div class="loading-wrapper">
      <Loading v-if="users.isLoading" />
      <div v-else>
        <b-table
          v-if="users.data.length > 0"
          :items="pages[currentPage]"
          :fields="fields"
          sticky-header
          responsive
        >
          <template v-slot:cell(actions)="data">
            <span class="actions">
              <b-button size="sm" variant="primary" @click="gotoUserUpdatePage(data.item.ID)">Edit</b-button>
              <b-button size="sm" variant="danger" @click="confirmDelete(data.item.ID)">Delete</b-button>
            </span>
          </template>
        </b-table>
        <b-jumbotron v-else lead="There are no members." />
        <b-pagination
          v-if="totalRows > limit"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="limit"
        ></b-pagination>
      </div>
    </div>
    <DeleteConfirmModal title="User delete confirmation" v-on:confirm-delete="deleteUser" modalId="modal-2" />
  </div>
</template>
<script>
  import Loading from "../components/Loading.vue"
  import DeleteConfirmModal from "../components/DeleteConfirmModal.vue"
  import usersList from "../../../mixins/usersList"
  import { getUsersCount } from "../../../data/users"
  import { makeToast, getCSRFToken } from "../utils"
  export default {
    data() {
      return {
        currentPage: 1,
        totalRows: 0,
        fields: [{ key: "name", stickyColumn: true }, "email", "role", { key: "actions", label: "" }],
      }
    },

    watch: {
      currentPage(cur) {
        if (!this.pages[cur]) {
          this._getUsers({ page: cur })
        }
      },
    },

    mixins: [usersList],

    components: {
      Loading,
      DeleteConfirmModal,
    },

    created() {
      getCSRFToken()

      getUsersCount().then((count) => {
        this.totalRows = count
      })

      this._getUsers({})
      this.$route.params.makeToast && this.makeToast("success", "User created.")
    },

    methods: {
      makeToast,
      confirmDelete(id) {
        this.deleteItem = id
        this.$root.$emit("bv::show::modal", "modal-2")
      },

      gotoUserUpdatePage(id) {
        this.$router.push(`/users/${id}`)
      },

      successCallback() {
        getUsersCount().then((count) => {
          this.totalRows = count
        })

        this._getUsers({ page: this.currentPage })

        for(let i = this.currentPage + 1; i <= this.pages.length; i++) {
          if (this.pages[i]) {
            this.pages[i].length = 0
          }
        }

        this.makeToast("success", "User deleted.")
        this.closeModal()
      },

      errorCallback() {
        this.makeToast("danger", "Error on user delete.")
        this.closeModal()
      },

      closeModal() {
        this.$root.$emit("bv::hide::modal", "modal-2")
      }
    }
  }
</script>
