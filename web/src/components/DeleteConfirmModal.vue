<template>
  <b-modal v-bind:title="title" hide-footer v-bind:id="modalId">
    <div>Are you sure you want to delete this item?</div>
    <div class="actions">
      <b-button variant="danger" @click="$emit('confirm-delete')">Yes</b-button>
      <b-button variant="primary" @click="hideModal">No</b-button>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'deletemodal',

  props: ['modalId', 'title'],

  methods: {
    hideModal() {
      this.$root.$emit('bv::hide::modal', this.modalId);
    },
  },
};
</script>
<style scoped>
  button {
    margin-right: .5rem;
  }

  .actions {
    /* text-align: left; */
    margin-bottom: .7rem;
    margin-top: 1rem;
  }
</style>
