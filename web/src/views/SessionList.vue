<template>
  <div class="snapback-list">
    <div class="page-header">
      <h4>Snap-back sessions</h4>
      <b-button @click="$router.push({ path: '/sessions/create' })" variant="primary">Add Session</b-button>
      <!-- <b-button @click="showModal" ref="btnShow">Open Modal</b-button> -->
    </div>
    <div class="loading-wrapper">
      <Loading v-if="sessions.isLoading" />
      <div v-else>
        <b-table
          :items="pages[currentPage]"
          :fields="fields"
          sticky-header
          responsive
          v-if="hasSessions"
        >
          <template v-slot:cell(actions)="data">
            <span class="actions">
              <b-button v-if="data.item.status === 'next'" size="sm" variant="primary" @click="editSession(data.item.ID)">Edit</b-button>
              <b-button v-if="data.item.status === 'next'" size="sm" variant="info" @click="startSession(data.item.ID)">Start</b-button>
              <b-button v-if="data.item.status === 'next'" size="sm" variant="danger" @click="confirmDelete(data.item.ID)">Delete</b-button>
            </span>
          </template>
        </b-table>
        <b-jumbotron v-if="!hasSessions" lead="There are no sessions." />
        <b-pagination
          v-if="totalRows > limit"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="limit"
        ></b-pagination>
      </div>
    </div>
    <DeleteConfirmModal title="Session delete confirmation" v-on:confirm-delete="deleteSession" modalId="modal-1" />
  </div>
</template>
<script>
  import Loading from "../components/Loading.vue"
  import DeleteConfirmModal from "../components/DeleteConfirmModal.vue"
  import { makeToast } from "../utils"
  import { getSessionsCount } from "../../../data/sessions"
  import sessionsMixin from "../../../mixins/sessions"
  
  export default {
    data() {
      return {
        currentPage: 1,
        totalRows: 0,
        fields: [{ key: "title", stickyColumn: true }, "status", "max_participants", "date_n_time", { key: "actions", label: "" }],
      }
    },

    watch: {
      currentPage(cur) {
        if (!this.pages[cur]) {
          this.getSessions({ page: cur })
        }
      },
    },

    created() {
      getSessionsCount().then((count) => {
        this.totalRows = count
      })

      this.getSessions({})
      this.$route.params.makeToast && this.makeToast("success", "Session Created.")
    },

    mixins: [sessionsMixin],

    components: {
      DeleteConfirmModal,
      Loading,
    },

    methods: {
      makeToast,

      editSession(id) {
        this.$router.push(`/sessions/${id}`)
      },

      startSession(id) {
        this.$router.push(`/sessions/${id}/start`)
      },

      confirmDelete(id) {
        this.deleteItem = id
        this.$root.$emit("bv::show::modal", "modal-1")
      },

      deleteSuccessCallback() {
        getSessionsCount().then((count) => {
          this.totalRows = count
        })

        this.getSessions({ page: this.currentPage })
        for(let i = this.currentPage + 1; i <= this.pages.length; i++) {
          if (this.pages[i]) {
            this.pages[i].length = 0
          }
        }

        this.makeToast("success", "Session deleted.")
        this.hideModal()
      },

      deleteErrorCallback() {
        this.makeToast("danger", "Error on session delete."),
        this.hideModal()
      },

      hideModal() {
        this.$root.$emit("bv::hide::modal", "modal-1")
      }
    }
  }
</script>