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

    let message

    if (error.response.status === 500) {
      message = "Something happends on our side. Sorry for inconvenience."
    } else if (error.response.status !== null) {
      message = error.response.data.message
    } else {
      message = "No internet connection."
    }

    console.log("message", message)

    store.setBackendError(false, message)
  }
}

// const ajax = async function (method, url, payload) {
//   return await apiCall(store, method, url, payload)
// }

export default ajax

