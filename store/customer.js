import Validation from '~/plugins/Validation'

export const state = () => ({
  name: {},
  email: {}
})

const ValidationRule = {
  name: 'required|max:10',
  email: 'required|email|max:5'
}

export const actions = {
  set ({ commit }, { key, value }) {
    // validation
    const result = Validation.run(value, ValidationRule[key])
    if (result !== true) {
      commit('error', { key, message: result })
      return
    }

    // api

    commit('set', { key, value })
  }
}

export const mutations = {
  init (state) {
    for (const key in state) {
      const prop = {
        value: '初期値テスト ' + key,
        error: null,
        success: false
      }
      state[key] = { ...state[key], ...prop }
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
  get: state => (key) => {
    return state[key].value
  },
  error: state => (key) => {
    return state[key].error
  },
  success: state => (key) => {
    return state[key].success
  }
}
