import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import UsersList from "./views/UsersList.vue"
import NextSessions from "./views/NextSessions.vue"
import Signups from "./views/Signups.vue"
import SessionForm from "./views/SessionForm.vue"
import SessionList from "./views/SessionList.vue"
import Layout from "./components/Layout.vue"
import MyProfile from "./views/MyProfile.vue"
import CreateNEditUser from "./views/CreateNEditUser.vue"
// import ResetPassword from "./views/ResetPassword.vue"
// import ChangePassword from "./views/ChangePassword.vue"
// import PageNotFound from "./views/PageNotFound.vue"
import SessionStart from "./views/SessionStart.vue"
import { isLoggedIn } from "./utils"
import { whoAmI } from "../../data/users"

Vue.use(Router)

// admin only has access to these routes
const isAdminRoute = function name(route) {
  const adminOnlyRoutes = ["/users"]

  return adminOnlyRoutes.find((elem) => route.indexOf(elem) >= 0)
}

// // admin and trainer has access to all the routes
const isTrainerRoute = function name(route) {
  const trainerRoutes = ["/sessions"]

  return trainerRoutes.find((elem) => route.indexOf(elem) >= 0)
}

const beforeChildEnter = (to, from, next) => {
  if (to.params.id && isNaN(to.params.id)) {
    next("/page-not-found")
  } else {
    for (const key in from.params) {
      if (from.params.hasOwnProperty(key)) {
        if (!to.params[key]) {
          to.params[key] = from.params[key]
        }
      }
    }
    next()
  }
}

export const options = {
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/register", name: "register", component: Register },
    { path: "/login", name: "login", component: Login },
    // { path: "/reset-password", component: ResetPassword },
    // { path: "/change-password", component: ChangePassword },
    // { path: "/page-not-found", component: PageNotFound },
    {
      path: "/",
      component: Layout,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = isLoggedIn()
        if (isAuthenticated) {
          whoAmI()
            .then((user) => {
              const { role } = user
              if (
                (role !== "admin" && isAdminRoute(to.path)) ||
                (role !== "trainer" && role !== "admin" && isTrainerRoute(to.path))
              ) {
                next("/page-not-found")
              } else {
                if (to.path === "/login" && isAuthenticated) {
                  next("/")
                }
                to.params.user = user
                next()
              }
            })
        } else {
          next("/login")
        }
      },
      children: [
        {
          path: "",
          name: "home",
          component: NextSessions,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/next-sessions",
          name: "nextSessions",
          component: NextSessions,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/my-signups",
          name: "mySignups",
          component: Signups,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/sessions/create",
          name: "session-create",
          component: SessionForm,
          beforeEnter: beforeChildEnter,
          props: {
            isCreate: true
          }
        },
        {
          path: "/users",
          name: "userlist",
          component: UsersList,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/users/create",
          component: CreateNEditUser,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/users/:id",
          component: CreateNEditUser,
          beforeEnter: beforeChildEnter,
          props: {
            isUpdate: true
          }
        },
        {
          name: "sessionlist",
          path: "/sessions",
          component: SessionList,
          beforeEnter: beforeChildEnter,
        },
        {
          name: "session-start",
          path: "/sessions/:id/start",
          component: SessionStart,
          beforeEnter: beforeChildEnter,
        },
        {
          path: "/sessions/:id",
          name: "session-edit",
          component: SessionForm,
          beforeEnter: beforeChildEnter,
        },
        {
          name: "my-profile",
          path: "/account-settings",
          component: MyProfile,
          beforeEnter: beforeChildEnter,
        },
      ],
    },
    // {
    //   path: "*",
    //   component: PageNotFound,
    // },
  ],
}
export default new Router(options)
