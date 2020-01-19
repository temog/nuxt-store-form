<template>
  <div class="container">
    <div class="field">
      <label class="label">選択肢によって追加Field</label>
      <div class="control">
        <radio-component :module="'customer'" :state="'shippingAddress'" />
      </div>
      <error-component :module="'customer'" :state="'shippingAddress'" />
    </div>

    <div v-if="getValue('customer', 'shippingAddress') === 'other'" class="field">
      <label class="label">配送先</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'otherShippingAddress'" />
        <validate-icon-component :module="'customer'" :state="'otherShippingAddress'" />
      </div>
      <error-component :module="'customer'" :state="'otherShippingAddress'" />
    </div>

    <div class="field">
      <label class="label">server side validation</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'authCode'" />
        <validate-icon-component :module="'customer'" :state="'authCode'" />
      </div>
      <error-component :module="'customer'" :state="'authCode'" />
    </div>

    <div class="field is-grouped">
      <div class="control">
        <nuxt-link to="/" class="button is-link is-light">
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
import RadioComponent from '~/components/Radio'
import TextComponent from '~/components/Text'

export default {
  components: {
    ValidateIconComponent,
    ErrorComponent,
    RadioComponent,
    TextComponent
  },
  computed: {
    ...mapGetters({ validationSuccess: 'validation/success' })
  },
  mounted () {
    // this.$store.commit('validation/reset')
  },
  methods: {
    getValue (module, state) {
      return this.$store.getters[module + '/get'](state, 'value')
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
