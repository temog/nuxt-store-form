import Validation from '~/plugins/Validation'
import Api from '~/plugins/api'
import Devices from '~/plugins/devices'

export const state = () => ({
  name: {}
})

export const actions = {
  async set ({ commit }, { key, value }) {
    // validation
    const rules = Devices.getRules()
    const result = Validation.run(value, rules[key])
    if (result !== true) {
      commit('error', { key, message: result })
      return
    }

    // api
    const apiResult = await Api.setData('device0', key, value)
    if (apiResult === true) {
      commit('set', { key, value })
    } else {
      commit('error', { key, message: apiResult })
    }
  }
}

export const mutations = {
  init (state) {
    for (const key in state) {
      const prop = {
        value: null,
        error: null,
        success: false
      }
      state[key] = { ...prop, ...state[key] }
    }
  },
  // 値のセットとエラーの解除
  set (state, { key, value }) {
    state[key].value = value
    state[key].error = null
    state[key].success = true
  },
  error (state, { key, message }) {
    state[key].error = message
    state[key].success = false
  }
}

export const getters = {
  get: state => (key, prop) => {
    prop = prop || 'value'
    return state[key][prop]
  },
  error: state => (key) => {
    return state[key].error
  },
  success: state => (key) => {
    return state[key].success
  }
}
