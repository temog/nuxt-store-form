<template>
  <div>
    <span v-if="success" class="icon is-small is-right">
      <i class="fas fa-check" />
    </span>
    <span v-if="error" class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    module: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    }
  },
  computed: {
    success () {
      return this.$store.getters[this.module + '/success'](this.state)
    },
    error () {
      return this.$store.getters[this.module + '/error'](this.state)
    }
  }
}
</script>
