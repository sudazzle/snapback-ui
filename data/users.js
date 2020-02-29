import ajax from "./ajax"

const createNewUser = async function ({ payload }) {
  return await ajax("post", `/users/new`, payload)
}

const getUsersCount = async function () {
  return await ajax("get", `/users/count`)
}

const logIn = async function ({ payload }) {
  return await ajax(
    "post",
    `/users/login`,
    payload
  )
}

const whoAmI = async function () {
  return await ajax("get", `/get-my-info`)
}

const updateUser = async function ({ payload, id }) {
  const url = id ? `/users/${id}` : "/update-my-info"
  return await ajax("patch", url, payload)
}

const changeUserPassword = async function ({ payload, id }) {
  const url = id ? `/users/${id}/changepassword` : "users/changepassword"
  return await ajax("patch", url, payload)
}

const getUserById = async function ({ id }) {
  const url = `/users/${id}`
  return await ajax("get", url)
}

const getUsers = async function ({ page = 1, limit = -1 }) {
  return await ajax("get", `/users?page=${page}&limit=${limit}`)
}

const deleteUserById = async function ({ id }) {
  return await ajax("delete", `/users/${id}`)
}

const resetPassword = async function({ payload }) {
  return await ajax("post", `/resetpassword`, payload)
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
  getUsersCount,
  resetPassword,
}
