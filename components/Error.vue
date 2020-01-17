<template>
  <p v-if="error" class="help is-danger">
    {{ error }}
  </p>
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
    error () {
      return this.$store.getters[this.module + '/error'](this.state)
    }
  }
}
</script>
