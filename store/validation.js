export const state = () => ({
  moduleState: []
})

export const mutations = {
  reset (state) {
    state.moduleState = []
  },
  add (state, { module, stateName }) {
    state.moduleState.push({ module, state: stateName })
  },
  remove (state, { module, stateName }) {
    state.moduleState = state.moduleState.filter(data => data.module !== module || data.state !== stateName)
  }
}

export const getters = {
  success: (state, getters, rootState) => {
    console.log(state.moduleState)
    console.log(rootState.customer)
    const errors = state.moduleState.filter((data) => {
      return !rootState[data.module][data.state].success
    })
    return !errors.length
  }
}
