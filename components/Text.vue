<template>
  <input
    v-model="value"
    @blur="register"
    :class="validationStatus"
    :placeholder="placeholder"
    class="input"
    type="text"
  >
</template>

<script>
import { mapMutations } from 'vuex'
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
    },
    placeholder () {
      return this.$store.getters[this.module + '/get'](this.state, 'placeholder')
    }
  },
  mounted () {
    console.warn('mounted ' + this.module + ' / ' + this.state)
    this.$nextTick(() => {
      this.addValidation({ module: this.module, stateName: this.state })
      this.value = this.$store.getters[this.module + '/get'](this.state)
    })
  },
  destroyed () {
    this.removeValidation({ module: this.module, stateName: this.state })
  },
  methods: {
    ...mapMutations({ addValidation: 'validation/add', removeValidation: 'validation/remove' }),
    register () {
      this.$store.dispatch(this.module + '/set', { key: this.state, value: this.value })
    }
  }
}
</script>
