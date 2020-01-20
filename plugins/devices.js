class Devices {
  static getRules () {
    return {
      name: 'required|max:100'
    }
  }

  static getProps () {
    return {
      name: {}
    }
  }
}
export default Devices
