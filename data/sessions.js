import ajax from "./ajax"

const getNextSessions = async function () {
  const response = await ajax("get", `/sessions/next`)
  return response ? response : []
}

const getSessionsCount = async function() {
  return await ajax("get", `/sessions/count`)
}

const getSessionSignups = async function () {
  const response = await ajax("get", `/get-my-signups`)
  return response ? response : []
}

const cancelSessionSignup = async function ({ id }) {
  return await ajax("delete", `/signups/${id}/cancel`)
  
}

const getSessionById = async function ({ id }) {
  return await ajax("get", `/sessions/${id}`)
}

const getSessions = async function ({ page = 1, limit = -1 }) {
  const response = await ajax("get", `/sessions?page=${page}&limit=${limit}`)
  return response ? response : []
}

const createNewSession = async function( { payload }) {
  return await ajax("post", `sessions/new`, payload)
}

const updateSession = async function({ id, payload }) {
  return await ajax("patch", `/sessions/${id}`, payload)
}

const deleteSession = async function({ id }) {
  return await ajax("delete", `/sessions/${id}`)
}

const signUp = async function({ payload }) {
  return await ajax("post", `/sessions/signup`, payload)
}

const startSession = async function({ id, payload }) {
  return await ajax("patch", `/sessions/${id}/start`, payload)
}

const getSignupsById = async function({ id }) {
  const response = await ajax("get", `/sessions/${id}/signups`)
  return response ? response : []
}

export {
  getNextSessions,
  getSessions,
  getSessionSignups,
  cancelSessionSignup,
  getSessionById,
  createNewSession,
  updateSession,
  deleteSession,
  signUp,
  startSession,
  getSignupsById,
  getSessionsCount,
}
