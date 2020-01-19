class Devices {
  static getRules () {
    return {
      name: 'required|max:10'
    }
  }

  static getProps () {
    return {
      name: {}
    }
  }
}
export default Devices
