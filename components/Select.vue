<template>
  <div :class="validationStatus" class="select">
    <select v-model="value" @change="register">
      <option v-for="(op, key) in list" :key="key" :value="op.value">
        {{ op.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Api from '~/plugins/api'
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
      value: null,
      list: []
    }
  },
  computed: {
    validationStatus () {
      let style = ''
      if (!this.list.length) {
        style = 'is-loading'
      }
      if (this.$store.getters[this.module + '/error'](this.state)) {
        style += ' is-danger'
      }
      if (this.$store.getters[this.module + '/success'](this.state)) {
        style += ' is-success'
      }
      return style
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.addValidation({ module: this.module, stateName: this.state })
      this.value = this.$store.getters[this.module + '/get'](this.state)
      this.list = this.$store.getters[this.module + '/get'](this.state, 'list')
      if (!this.list.length) {
        this.getData()
      }
    })
  },
  destroyed () {
    this.removeValidation({ module: this.module, stateName: this.state })
  },
  methods: {
    ...mapMutations({ addValidation: 'validation/add', removeValidation: 'validation/remove' }),
    register () {
      this.$store.dispatch(this.module + '/set', { key: this.state, value: this.value })
    },
    async getData () {
      const data = await Api.getData(this.state)
      const empty = [{ label: '選択', value: null }]
      this.list = [...empty, ...data]
    }
  }
}
</script>
