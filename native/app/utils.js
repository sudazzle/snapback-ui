// import { get } from "axios"
import { setString, getString, remove } from "tns-core-modules/application-settings"
// import store from "../../data/store"

// const csrfKey = "snapback_csrf_token"
const authKey = "snapback_auth_token"

function saveToken(type, token) {
  let key
  if (type === "csrf") {
    key = csrfKey
  }

  if (type === "auth") {
    key = authKey
  }

  setString(key, token)
}

function presistUserInfo(user) {
  setString("userInfo", JSON.stringify(user))
}

function getUserInfo() {
  console.log('get info', getString("userInfo"))
  return getString("userInfo")
}

function signOut() {
  remove(authKey)
}

function getAuthToken() {
  return getString(authKey)
}

function isLoggedIn() {
  if (getString(authKey)) {
    return true
  }

  return false
}

const getBaseUrl = function() {
  let baseUrl = ""
  if (TNS_ENV === "development") {
    baseUrl = "http://10.0.2.2:8000"
    // baseUrl = "http://192.168.11.192:8000"

  } else if (TNS_ENV === "staging") {
    baseUrl = "http://snapback.sudaman-shrestha.com"
  } else {
    baseUrl = "lets see"
  }

  console.log("baseURL", baseUrl)

  return baseUrl
}

// const getCSRFToken = async () => {
//   const baseUrl = getBaseUrl()
//   const response = await get(`${baseUrl}/api/info`)
//   if (response.status === 200) {
//     const csrfToken = response.headers["x-csrf-token"]
//     store.setCSRFToken(csrfToken)
//   }
// }

const makeAlert = function (message) {
  alert({ title: "", message, okButtonText: "OK" })
}

export {
  getAuthToken,
  saveToken,
  isLoggedIn,
  presistUserInfo,
  getUserInfo,
  // getCSRFToken,
  makeAlert,
  getBaseUrl,
  signOut,
}
