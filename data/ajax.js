// Because of some weired issue with mobile app while importing store was creating issue
// It is a quick fix.
import axios from "axios"

// import { ajax as apiCall } from "../utils/common"
import store from "./store"

const ajax = async (method = "get", url, body = {}) => {
  const { baseUrl, headers } = store.state.backEnd

  store.setBackendError()
  try {
    const instance = axios.create({
      baseURL: baseUrl + '/api',
      timeout: 1500,
      headers,
    })

    const response = await instance[method](url, body)
    const keys = Object.keys(response.data)

    return response.data[keys[0]]
  } catch (error) {
    for (let [key, value] of Object.entries(store.state)) {
      if (typeof value.isLoading !== "undefined") {
        store.setIsLoading(key, false)
      }
    }

    let appError = false
    let pageError = false

    if (error.response.status === 500) {
      appError = "Something happends on our side. Sorry for inconvenience."
      pageError = false
    } else if (error.response.status !== null) {
      appError = false
      pageError = error.response.data.message
    } else {
      pageError = false
      appError = "No internet connection."
    }

    store.setBackendError(pageError, appError)
  }
}

// const ajax = async function (method, url, payload) {
//   return await apiCall(store, method, url, payload)
// }

export default ajax

