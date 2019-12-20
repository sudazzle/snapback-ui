import { get, post, patch, delete as del } from "axios"
import store from "./store"

const getNextSessions = async function () {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/sessions/next`, { headers })

  if (response.status === 200) {
    const temp = response.data.sessions
    return temp === null ? [] : temp
  }
}

const getSessionSignups = async function () {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/get-my-signups`, { headers })

  if (response.status === 200) {
    const temp = response.data.signups
    return temp === null ? [] : temp
  }
}

const cancelSessionSignup = async function ({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await del(`${baseUrl}/api/signups/${id}/cancel`, { headers })

  if (response.status === 200) {
    return true
  }
}

const getSessionById = async function ({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/sessions/${id}`, { headers })

  if (response.status === 200) {
    return response.data.session
  }
}

const getSessions = async function () {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/sessions`, { headers })

  if (response.status === 200) {
    let temp = response.data.sessions
    return temp === null ? [] : temp
  }
}

const createNewSession = async function( { payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await post(`${baseUrl}/api/sessions/new`, payload, { headers })

  if (response.status === 200) {
    return true
  }
}

const updateSession = async function({ id, payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await patch(`${baseUrl}/api/sessions/${id}`, payload, { headers })

  if (response.status === 200) {
    return true
  }
}
const deleteSession = async function({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await del(`${baseUrl}/api/sessions/${id}`, { headers })

  if (response.status === 200) {
    return true
  }
}

const signUp = async function({ payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await post(
    `${baseUrl}/api/sessions/signup`,
    payload,
    { headers },
  )

  if (response.status === 200) {
    return true
  }
}

const startSession = async function({ id, payload }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await patch(`${baseUrl}/api/sessions/${id}/start`, payload, {
    headers,
  })

  if (response.status === 200) {
    return true
  }
}

const getSignupsById = async function({ id }) {
  const { baseUrl, headers } = store.state.backEnd
  const response = await get(`${baseUrl}/api/sessions/${id}/signups`, {
    headers,
  })

  if (response.status === 200) {
    return response.data.signups ? response.data.signups : []
  }
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
}
