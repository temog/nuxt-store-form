import Validation from '~/plugins/Validation'
import Api from '~/plugins/api'

export const state = () => ({
  count: {
    value: 1,
    list: [
      { value: null, label: '選択' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' }
    ]
  }
})

const ValidationRule = {
  count: 'required'
}

export const actions = {
  async set ({ commit }, { key, value }) {
    // validation
    const result = Validation.run(value, ValidationRule[key])
    if (result !== true) {
      commit('error', { key, message: result })
      return
    }

    // api
    const apiResult = await Api.setData('devices', key, value)
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
