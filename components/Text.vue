<template>
  <input
    v-model="value"
    @blur="register"
    :class="validationStatus"
    class="input"
    type="text"
    placeholder="Text input"
  >
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
  data () {
    return {
      value: null
    }
  },
  computed: {
    validationStatus () {
      if (this.$store.getters[this.module + '/error'](this.state)) {
        return 'is-danger'
      }
      if (this.$store.getters[this.module + '/success'](this.state)) {
        return 'is-success'
      }

      return ''
    }
  },
  mounted () {
    console.warn(this.module, this.state)
    this.$nextTick(() => {
      this.value = this.$store.getters[this.module + '/get'](this.state)
    })
  },
  methods: {
    register () {
      this.$store.dispatch(this.module + '/set', { key: this.state, value: this.value })
    }
  }
}
</script>
