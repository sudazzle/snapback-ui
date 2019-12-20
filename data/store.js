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
      baseUrl: "",
      headers: {
        "Authorization": "",
        "X-CSRF-TOKEN": "",
      }
    },
    currentUser: {
      isLoading: false,
      // data: {},
    },
    sessions: {
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

  setCSRFToken(token) {
    this.state.backEnd.headers["X-CSRF-TOKEN"] = token
  },

  setIsLoading(type, val = true) {
    this.state[type].isLoading = val
  },

  setSessions(sessions) {
    const thisSessions = this.state.sessions.data
    clearArray(thisSessions)
    pushToArrayFromArray(sessions, thisSessions)
    this.setIsLoading("sessions", false)
  },

  setSelectedDate({ year, month, day, weekDay }) {
    this.state.selectedDate.year = year
    this.state.selectedDate.month = prependZero(month)
    this.state.selectedDate.day = prependZero(day)
    this.state.selectedDate.weekDay = weekDay
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

  // removeSession(id) {
  //   const sessions = this.state.sessions.data
  //   const index = sessions.findIndex((elem) => id === elem.ID)
  //   index && sessions.splice(index, 1)
  //   this.setIsLoading("sessions", false)
  // },

  // setCurrentUser({ role, ID }) {
  //   presistUserRole({ role, ID })
  //   this.setIsLoading("currentUser", false)
  // },

  setUsers(users) {
    const thisUsers = this.state.users.data
    clearArray(thisUsers)
    pushToArrayFromArray(users, thisUsers)
    this.setIsLoading("users", false)
  },

  // setUsers(users) {
  //   const thisUsers = this.state.users.data
  //   users.forEach((element) => {
  //     const exists = thisUsers.find((elem) => elem.ID === element.ID)
  //     !exists && thisUsers.push(element)
  //   })

  //   this.setIsLoading("users", false)
  // },

  // removeUser(id) {
  //   const users = this.state.users.data
  //   const index = users.findIndex((elem) => id === elem.ID)
  //   index && users.splice(index, 1)
  //   this.setIsLoading("users", false)
  // },

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
  // removeSignups(signup_id) {
  //   console.log("signup", signup_id)
  //   const signups = this.state.mySignups.data
  //   const index = signups.findIndex((elem) => signup_id === elem.signup_id)
  //   console.log("index", index)
  //   index && signups.splice(index, 1)
  //   this.setIsLoading("mySignups", false)
  // },
}

export default store