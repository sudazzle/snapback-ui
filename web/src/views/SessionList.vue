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
          :items="sessions.data"
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
        <b-jumbotron v-else lead="There are no sessions." />
      </div>
    </div>
    <DeleteConfirmModal title="Session delete confirmation" v-on:confirm-delete="deleteSession" modalId="modal-1" />
  </div>
</template>
<script>
  import Loading from "../components/Loading.vue"
  import DeleteConfirmModal from "../components/DeleteConfirmModal.vue"
  import { makeToast } from "../utils"
  import sessionsMixin from "../../../mixins/sessions"
  
  export default {
    data() {
      return {
        fields: [{ key: "title", stickyColumn: true }, "status", "max_participants", "date_n_time", { key: "actions", label: "" }],
      }
    },

    created() {
      this.getSessions()
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