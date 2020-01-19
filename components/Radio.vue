<template>
  <div :class="validationStatus" class="radio-area">
    <label v-for="(radio, key) in list" class="radio">
      <input v-model="value" @change="register" :key="key" :value="radio.value" type="radio">
      {{ radio.label }}
    </label>
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
      this.list = data
    }
  }
}
</script>

<style scoped>
.radio-area {
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  min-height: 36px;
}
.radio-area.is-loading::after {
    position: absolute!important;
    left: .625em;
    top: .625em;
    z-index: 4;
}
.radio-area.is-loading::after {
  -webkit-animation: spinAround .5s infinite linear;
  animation: spinAround .5s infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}
.radio-area.is-success {
  border-color: #48c774;
}
.radio-area.is-danger {
  border-color: #f14668;
}
</style>
