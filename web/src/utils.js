import { get } from "axios"
import store from "../../data/store"

const csrfKey = "snapback_csrf_token"
const authKey = "snapback_auth_token"

function saveToken(type, token) {
  let key
  if (type === "csrf") {
    key = csrfKey
    sessionStorage.setItem(key, token)
  }

  if (type === "auth") {
    key = authKey
    localStorage.setItem(key, token)
  }
}

function signOut() {
  localStorage.removeItem(authKey)
}

function getAuthToken() {
  return localStorage.getItem(authKey)
}

function isLoggedIn() {
  if (localStorage.getItem(authKey)) {
    return true
  }

  return false
}

function getBaseUrl() {
  return ""
}

const getCSRFToken = async () => {
  const baseUrl = getBaseUrl()
  const response = await get(`${baseUrl}/api/info`)
  if (response.status === 200) {
    const csrfToken = response.headers["x-csrf-token"]
    store.setCSRFToken(csrfToken)
    // saveToken("csrf", csrfToken)
  }

  return new Error(response)
}

const makeToast = function (variant = null, content) {
  this.$bvToast.toast(content, {
    title: false,
    variant,
    solid: true,
  })
}

export {
  getAuthToken,
  saveToken,
  isLoggedIn,
  signOut,
  getCSRFToken,
  getBaseUrl,
  makeToast,
}
