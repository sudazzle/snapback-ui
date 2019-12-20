const getMonths = function() {
  return [
    { text: "January", value: "01" },
    { text: "February", value: "02" },
    { text: "March", value: "03" },
    { text: "April", value: "04" },
    { text: "May", value: "05" },
    { text: "June", value: "06" },
    { text: "July", value: "07" },
    { text: "August", value: "08" },
    { text: "September", value: "09" },
    { text: "October", value: "10" },
    { text: "November", value: "11" },
    { text: "December", value: "12" },
  ]
}

const getDay = function(day) {
  switch (day) {
    case 0:
      return "Sunday"
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
  }
}

const getYearsList = function() {
  const currYear = getCurrentYear()
  const years = [currYear]
  for (let i = 0; i < 5; i++) {
    years.push(years[i] + 1)
  }

  return years
}

const getCurrentYear = function() {
  const currDate = new Date()
  return currDate.getFullYear()
}

const getCurrentMonth = function() {
  const date = new Date()
  return date.getMonth() + 1
}

const getCurrentDay = function() {
  const date = new Date()
  return date.getDate()
}

const getCurrentHourAndMinute = function() {
  const date = new Date()
  return { hour: date.getHours(), minute: date.getMinutes() }
}

const getDaysOfGivenYearAndMonth = function(year, month) {
  const date = new Date(year, month, 0)
  const lastDay = date.getDate()

  const days = []
  for (let i = 1; i <= lastDay; i++) {
    days.push(prependZero(i))
  }

  return days
}

const getHours = function() {
  const hours = []

  for (let i = 0; i <= 24; i++) {
    let num = i

    if (i < 10) {
      num = `0${num}`
    }

    hours.push(num)
  }

  return hours
}

const getMinutes = function() {
  const minutes = []

  for (let i = 0; i <= 60; i++) {
    let num = i

    if (i < 10) {
      num = `0${num}`
    }

    minutes.push(num.toString())
  }

  return minutes
}

const stringToDateTime = function(date) {
  return new Date(date).toDateString()
}

const getTime = function(dateStr) {
  return dateStr.split(" ")[1]
}

const prependZero = function(num) {
  if (Number(num) < 10) {
    return `0${Number(num)}`
  }

  return num
}

const validateEmail = function(val) {
  const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g // eslint-disable-line
  return regx.test(val)
}

const clearArray = function(arr) {
  if (arr.length > 0) {
    arr.splice(0, arr.length)
  }
}

const pushToArrayFromArray = function(from, to) {
  from.forEach((element) => {
    to.push(element)
  })
}

function validatePassword({ password, hasConfirm = true, confirmPassword }) {
  if (password === "") {
    return {
      error: {
        message: "Password cannot be empty.",
        errorFor: "password",
      },
    }
  }

  if (password.length < 6) {
    return {
      error: {
        message: "Password length should be greater than six.",
        errorFor: "password",
      },
    }
  }

  if (hasConfirm) {
    if (confirmPassword === "") {
      return {
        error: {
          message: "Password confirmation cannot be empty.",
          errorFor: "confirmPassword",
        },
      }
    }

    if (password !== confirmPassword) {
      return {
        error: {
          message: "Password did not match.",
          errorFor: "confirmPassword",
        },
      }
    }
  }

  return { valid: true }
}

function validateUserForm({ email, hasName = true, name }) {
  if (hasName && name === "") {
    return {
      error: {
        message: "Member name cannot be empty.",
        errorFor: "name",
      },
    }
  }

  if (email === "") {
    return {
      error: {
        message: "Member email cannot be empty.",
        errorFor: "email",
      },
    }
  }

  if (!validateEmail(email)) {
    return {
      error: {
        message: "Invalid email address.",
        errorFor: "email",
      },
    }
  }

  return { valid: true }
}

export {
  getMonths,
  getCurrentMonth,
  getCurrentDay,
  getDaysOfGivenYearAndMonth,
  getYearsList,
  getHours,
  getMinutes,
  stringToDateTime,
  prependZero,
  getCurrentHourAndMinute,
  validateEmail,
  getTime,
  clearArray,
  pushToArrayFromArray,
  validatePassword,
  validateUserForm,
  getDay,
  getCurrentYear,
}
