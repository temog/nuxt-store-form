<template>
  <div>
    <header-component />
    <div v-if="isAllDataLoaded" class="section">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Api from '~/plugins/api'
import HeaderComponent from '~/components/Header'

export default {
  components: {
    HeaderComponent
  },
  data () {
    return {
      isAllDataLoaded: false
    }
  },
  async mounted () {
    const allData = await Api.getAllData()
    console.warn(allData)
    for (const module in allData) {
      for (const key in allData[module]) {
        this.$store.commit(module + '/set', { key, value: allData[module][key] })
      }
    }
    this.customerInit()
    this.devicesInit()
    this.device1Init()
    this.device2Init()
    this.isAllDataLoaded = true
  },
  methods: {
    ...mapMutations({
      customerInit: 'customer/init',
      devicesInit: 'devices/init',
      device1Init: 'device1/init',
      device2Init: 'device2/init'
    })
  }
}
</script>
