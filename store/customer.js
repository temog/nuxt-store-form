import Validation from '~/plugins/Validation'
import Api from '~/plugins/api'

export const state = () => ({
  name: { value: '初期値入れたい場合' },
  email: {},
  gender: {
    list: [
      { value: null, label: '選択' },
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' }
    ]
  },
  state: {
    list: []
  },
  phone: {
    list: []
  },
  shippingAddress: {
    list: [
      { value: 'default', label: '登録住所' },
      { value: 'other', label: 'その他' }
    ]
  },
  otherShippingAddress: {},
  authCode: { placeholder: 'TEST_HOGEHOGE で許可' }
})

const ValidationRule = {
  name: 'required|max:10',
  email: 'required|email|max:999',
  gender: 'required',
  state: 'required',
  phone: 'required',
  shippingAddress: 'required',
  otherShippingAddress: 'required',
  authCode: 'required'
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
    const apiResult = await Api.setData('customer', key, value)
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
