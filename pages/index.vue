<template>
  <div class="container">
    <div class="field">
      <label class="label">Name</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'name'" />
        <validate-icon-component :module="'customer'" :state="'name'" />
      </div>
      <error-component :module="'customer'" :state="'name'" />
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-right">
        <text-component :module="'customer'" :state="'email'" />
        <validate-icon-component :module="'customer'" :state="'email'" />
      </div>
      <error-component :module="'customer'" :state="'email'" />
    </div>

    <div class="field">
      <label class="label">Select</label>
      <div class="control">
        <select-component :module="'customer'" :state="'gender'" />
      </div>
      <error-component :module="'customer'" :state="'gender'" />
    </div>

    <div class="field">
      <label class="label">api から取得する select</label>
      <div class="control">
        <select-component :module="'customer'" :state="'state'" />
      </div>
      <error-component :module="'customer'" :state="'state'" />
    </div>

    <div class="field">
      <label class="label">api から取得する radio</label>
      <div class="control">
        <radio-component :module="'customer'" :state="'phone'" />
      </div>
      <error-component :module="'customer'" :state="'phone'" />
    </div>

    <div class="field is-grouped">
      <div class="control">
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
import RadioComponent from '~/components/Radio'

export default {
  components: {
    ValidateIconComponent,
    ErrorComponent,
    TextComponent,
    SelectComponent,
    RadioComponent
  },
  computed: {
    ...mapGetters({ validationSuccess: 'validation/success' })
  },
  mounted () {
    // this.$store.commit('validation/reset')
  },
  methods: {
    test () {
      console.log('hoge')
    },
    validation () {
      if (!this.validationSuccess) {
        alert('不備があるからだめ')
        return
      }
      this.$router.push('/page2')
    }
  }
}
</script>

<style>
</style>
