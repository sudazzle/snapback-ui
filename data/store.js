import {
  getCurrentMonth,
  getCurrentDay,
  getCurrentHourAndMinute,
  getDay,
  clearArray,
  pushToArrayFromArray,
  getYearsList,
  prependZero,
} from "../utils/common"

function getDefaultDate() {
  return {
    year: getYearsList()[0],
    month: prependZero(getCurrentMonth()),
    day: prependZero(getCurrentDay()),
    weekDay: getDay(new Date().getDay()),
  }
}

const { hour, minute } = getCurrentHourAndMinute()

const store = {
  state: {
    backEnd: {
      errorForLayout: false,
      errorForPage: false,
      baseUrl: "",
      headers: {
        "Authorization": "",
      }
    },
    currentUser: {
      isLoading: false,
      data: {
        email: "",
        role: "",
        ID: null,
      },
    },
    sessions: {
      currentPage: 1,
      isLoading: false,
      data: [],
    },
    mySignups: {
      isLoading: false,
      data: [],
    },
    nextSessions: {
      isLoading: false,
      data: [],
    },
    users: {
      currentPage: 1,
      isLoading: false,
      data: [],
    },
    selectedDate: { ...getDefaultDate() },
    selectedTime: {
      hour: prependZero(hour),
      minute: prependZero(minute),
    },
  },

  setBaseUrl(baseUrl) {
    this.state.backEnd.baseUrl = baseUrl
  },

  setAuthHeader(token) {
    this.state.backEnd.headers["Authorization"] = `Bearer ${token}`
  },

  setIsLoading(type, val = true) {
    this.state[type].isLoading = val
  },

  // setSessions(sessions) {
  //   const thisSessions = this.state.sessions.data
  //   clearArray(thisSessions)
  //   pushToArrayFromArray(sessions, thisSessions)
  //   this.setIsLoading("sessions", false)
  // },

  resetSessions() {
    this.state.sessions.data.length = 0
  },

  setSessions(sessions, currentPage) {
    const thisSessions = this.state.sessions.data
    pushToArrayFromArray(sessions, thisSessions)

    if (currentPage) {
      this.state.sessions.currentPage = currentPage
    }

    this.setIsLoading("sessions", false)
  },

  setSelectedDate({ year, month, day, weekDay }) {
    this.state.selectedDate.year = year
    this.state.selectedDate.month = prependZero(month)
    this.state.selectedDate.day = prependZero(day)
    this.state.selectedDate.weekDay = weekDay
  },

  removeUser(id) {
    this.state.users.data = this.state.users.data.filter(user => id !== user.ID)
  },

  removeSession(id) {
    this.state.sessions.data = this.state.sessions.data.filter(session => {
      console.log('remove session', id)
      console.log('remove ID', session.ID)
      return id !== session.ID
    })
  },

  resetSelectedDate() {
    this.setSelectedDate({ ...getDefaultDate() })
  },

  resetSelectedTime() {
    const { hour, minute } = getCurrentHourAndMinute()
    this.setSelectedTime({
      hour: prependZero(hour),
      minute: prependZero(minute),
    })
  },

  setSelectedTime({ hour, minute }) {
    this.state.selectedTime.hour = prependZero(hour)
    this.state.selectedTime.minute = prependZero(minute)
  },

  setSelectedDay(day) {
    this.state.selectedDate.day = prependZero(day)
  },

  setCurrentUser({ name, email, role, ID }) {
    const currentUser = this.state.currentUser.data
    name && (currentUser.name = name)
    ID && (currentUser.ID = ID)
    email && (currentUser.email = email)
    role && (currentUser.role = role)
    this.setIsLoading("currentUser", false)
  },

  resetUsers() {
    this.state.users.data.length = 0
  },

  setUsers(users, currentPage) {
    const thisUsers = this.state.users.data
    // clearArray(thisUsers)
    pushToArrayFromArray(users, thisUsers)

    if (currentPage) {
      this.state.users.currentPage = currentPage
    }

    this.setIsLoading("users", false)
  },

  setNextSessions(sessions) {
    const nextSessions = this.state.nextSessions.data
    clearArray(nextSessions)
    pushToArrayFromArray(sessions, nextSessions)
    this.setIsLoading("nextSessions", false)
  },

  setMySessionSignups(sessions) {
    const mySignups = this.state.mySignups.data
    clearArray(mySignups)
    pushToArrayFromArray(sessions, mySignups)
    this.setIsLoading("mySignups", false)
  },

  setBackendError(errorForPage = false, errorForLayout = false) {
    this.state.backEnd.errorForPage = errorForPage
    this.state.backEnd.errorForLayout = errorForLayout
  }
}

export default store