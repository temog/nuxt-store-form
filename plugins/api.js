import axios from 'axios'

class Api {
  static async getData (key) {
    const url = 'https://temo.dev/stub/nuxt-store-form/' + key + '.php'
    try {
      const client = axios.create({ withCredentials: true })
      const response = await client.get(url, {})
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static async getAllData () {
    const url = 'https://temo.dev/stub/nuxt-store-form/getData.php'
    try {
      const client = axios.create({ withCredentials: true })
      const response = await client.get(url, {})
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static async setData (module, key, value) {
    const url = 'https://temo.dev/stub/nuxt-store-form/setData.php'
    try {
      const client = axios.create({ withCredentials: true })
      const response = await client.post(url, { module, key, value })
      if (response.data.status === 'success') {
        return true
      }
      return response.data.message
    } catch (e) {
      console.log(e)
    }
  }
}
export default Api
