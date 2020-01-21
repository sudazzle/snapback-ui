import store from "../data/store"
import { getUsers } from "../data/users"
import { getSessionById, createNewSession, updateSession, getSessions } from "../data/sessions"
import { getDaysOfGivenYearAndMonth, getDay } from "../utils/common"

export default {
  name: "session-form",
  data() {
    return {
      title: "",
      description: "",
      max_participants: 20,
      date_n_time: "",
      selectedDate: store.state.selectedDate,
      selectedTime: store.state.selectedTime,
      maxParticipantsErr: false,
      titleErr: false,
      processing: false,
      userId: store.state.currentUser.data.ID,
      users: store.state.users
    }
  },

  props: ["isCreate", "session_id"],

  created() {
    this.getCSRFToken()
    store.resetUsers()
    getUsers({ limit: -1, page: 1 }).then((users) => {
      store.setUsers(users)
    })

    if (!this.isCreate) {
      this.processing = true
      this._getSessionById()
    }
  },

  destroyed() {
    store.resetSelectedTime()
    store.resetSelectedDate()
  },

  methods: {
    _getSessionById(args) {
      if (!this.isCreate) {
        const id = this.session_id || this.$route.params.id
        
        getSessionById({ id }).then((res) => {
          const { title, description, max_participants, date_n_time, user_id } = res
          const { year, month, day, hour, minute } = this.parseResponseDate(date_n_time)

          this.title = title
          this.description = description
          this.max_participants = max_participants
          this.userId = user_id
          this.days = getDaysOfGivenYearAndMonth(year, month)

          const tempDate = new Date(`${year}-${month}-${day}`)
          store.setSelectedDate({ year, month, day, weekDay: getDay(tempDate.getDay()) })
          store.setSelectedTime({ hour, minute })
          this.processing = false

          if (args) {
            args.object.refreshing = false
          }
        })
      }
    },

    compileRequestDate() {
      const { year: y, month: m, day: d } = this.selectedDate
      const { hour: hh, minute: mm } = this.selectedTime
      return `${y}-${m}-${d} ${hh}:${mm}`
    },

    parseResponseDate(dateNTime) {
      const slice = dateNTime.split(' ')
      const dateSlice = slice[0].split('-')
      const timeSlice = slice[1].split(':')
      const year = dateSlice[0]
      const month = dateSlice[1]
      const day = dateSlice[2]
      const hour = timeSlice[0]
      const minute = timeSlice[1]

      return {
        year, month, day, hour, minute,
      }
    },

    submit() {
      if (this.title === "") {
        this.titleErr = "Title cannot be empty."
        this.maxParticipantsErr = false
        this.focusInput && this.focusInput("title")
        return
      }

      if (this.max_participants === "") {
        this.maxParticipantsErr = "Participants number cannot be empty."
        this.focusInput && this.focusInput("maxParticipants")
        return
      }

      if (isNaN(this.max_participants)) {
        this.titleErr = false
        this.maxParticipantsErr = "Invalid number."
        this.focusInput && this.focusInput("maxParticipants")
        return
      }

      this.titleErr = false
      this.maxParticipantsErr = false

      const payload = {
        title: this.title,
        description: this.description,
        max_participants: Number(this.max_participants),
        date_n_time: this.compileRequestDate(),
        user_id: this.userId
      }

      this.processing = true
      if (this.isCreate) {
        createNewSession({ payload }).then(() => {
          store.setIsLoading("sessions")
          getSessions({}).then((sessions) => {
            store.setSessions(sessions)
          })
          this.redirectCallback && this.redirectCallback()
        }).catch((err) => {
          const message = "Something went wrong. Try again."
          this.errorCallback && this.errorCallback(message)
        }).finally(() => {
          this.processing = false
        })
      } else {
        const id = this.session_id || this.$route.params.id
        console.log("payload", payload)
        updateSession({ payload, id }).then(() => {
          store.setIsLoading("sessions")
          getSessions({}).then((sessions) => {
            store.setSessions(sessions)
          })
          const message = "Training session updated."
          this.successCallback && this.successCallback(message)
        }).catch(() => {
          const message = "Something went wrong. Try again."
          this.errorCallback && this.errorCallback(message)
        }).finally(() => {
          this.processing = false
        })
      }
    },    
  },
}