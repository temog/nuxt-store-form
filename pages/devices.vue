<template>
  <div class="container">
    <h3 class="title is-3">
      device 0
    </h3>

    <div class="field">
      <label class="label">name</label>
      <div class="control has-icons-right">
        <text-component :module="'device0'" :state="'name'" />
        <validate-icon-component :module="'device0'" :state="'name'" />
      </div>
      <error-component :module="'device0'" :state="'name'" />
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

export default {
  components: {
    ValidateIconComponent,
    ErrorComponent,
    TextComponent
  },
  data () {
    return {
      device1: null
    }
  },
  computed: {
    ...mapGetters({ validationSuccess: 'validation/success' }),
    device1Value () {
      return this.$store.getters['devices/get'](0, 'name', 'value')
    }
  },
  mounted () {
    this.$store.commit('device0/init')
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
