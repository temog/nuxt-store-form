<template>
  <div class="container">
    <div class="field">
      <label class="label">devices number</label>
      <div class="control">
        <select-component :module="'devices'" :state="'count'" />
      </div>
      <error-component :module="'devices'" :state="'count'" />
    </div>

    <div v-for="num in getValue('devices', 'count')" :key="num" class="field">
      <label class="label">device {{ num }} name</label>
      <div class="control has-icons-right">
        <text-component :module="'device' + num" :state="'name'" />
        <validate-icon-component :module="'device' + num" :state="'name'" />
      </div>
      <error-component :module="'device' + num" :state="'name'" />
    </div>

    <div class="field is-grouped">
      <div class="control">
        <nuxt-link to="/page2" class="button is-link is-light">
          <i class="fas fa-arrow-circle-left" />
          Prev
        </nuxt-link>
        <button @click="validation" class="button is-link">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ValidateIconComponent from '~/components/ValidateIcon'
import ErrorComponent from '~/components/Error'
import TextComponent from '~/components/Text'
import SelectComponent from '~/components/Select'

export default {
  components: {
    ValidateIconComponent,
    ErrorComponent,
    TextComponent,
    SelectComponent
  },
  data () {
    return {
      device1: null
    }
  },
  computed: {
    ...mapGetters({ validationSuccess: 'validation/success' })
  },
  mounted () {
  },
  methods: {
    getValue (module, state) {
      return this.$store.getters[module + '/get'](state, 'value')
    },
    register () {
      this.$store.commit('devices/set', { index: 0, key: 'name', value: this.device1 })
    },
    validation () {
      if (!this.validationSuccess) {
        alert('不備があるからだめ')
        return
      }
      this.$router.push('/devices')
    }
  }
}
</script>

<style>
</style>
