import { post, get, patch, delete as del } from "axios"
import store from "./store"

const createNewUser = async function ({ payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await post(`${baseUrl}/api/users/new`, payload, {
    headers,
  })

  if (response.status === 200) {
    return true
  }
}

const logIn = async function ({ payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await post(
    `${baseUrl}/api/users/login`,
    payload,
    {
      // withCredentials: true cross domain cookies
      headers,
    },
  )

  if (response.status === 200) {
    // const { token, ID, role } = response.data.user
    // saveToken("auth", token)
    // presistUserInfo({ ID, role, token })
    return response.data.user
  }
}

const whoAmI = async function () {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/get-my-info`, {
    headers,
  })

  if (response.status === 200) {
    return response.data.user
  }
}

const updateUser = async function ({ payload, id }) {
  const { baseUrl, headers } = store.state.backEnd
  const url = id ? `/api/users/${id}` : "/api/update-my-info"

  const response = await patch(baseUrl + url, payload, {
    headers,
  })

  if (response.status === 200) {
    return true
  }
}

const changeUserPassword = async function ({ payload, id }) {
  const { baseUrl, headers } = store.state.backEnd
  const url = id ? `/api/users/${id}/changepassword` : "/api/users/changepassword"
  const response = await patch(baseUrl + url, payload, { headers })

  if (response.status === 200) {
    return true
  }
}

const getUserById = async function ({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const url = `${baseUrl}/api/users/${id}`
  const response = await get(url, { headers })

  if (response.status === 200) {
    return response.data.user
  }
}

const getUsers = async function () {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/users`, {
    headers,
  })

  if (response.status === 200) {
    return response.data.users ? response.data.users : []
  }
}

const deleteUserById = async function ({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await del(`${baseUrl}/api/users/${id}`, {
    headers,
  })

  if (response.status === 200) {
    return true
  }
}

export {
  createNewUser,
  logIn,
  whoAmI,
  updateUser,
  changeUserPassword,
  getUserById,
  getUsers,
  deleteUserById,
}
