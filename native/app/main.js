import Vue from "nativescript-vue"
import Login from "./views/Login.vue"
import RadListView from "nativescript-ui-listview/vue"
import App from "./App.vue"
import { isLoggedIn, getBaseUrl, getAuthToken } from "./utils"
import store from "../../data/store"
import VueDevtools from "nativescript-vue-devtools"

const loggedIn = isLoggedIn()

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === "production")

Vue.use(RadListView)

Vue.registerElement(
  "PullToRefresh",
  () => require("@nstudio/nativescript-pulltorefresh").PullToRefresh,
)

Vue.registerElement("CheckBox", () => require("@nstudio/nativescript-checkbox").CheckBox, {
  model: {
    prop: "checked",
    event: "checkedChange",
  },
})

store.setBaseUrl(getBaseUrl())

if (loggedIn) {
  store.setAuthHeader(getAuthToken())
}

new Vue({
  render: (h) => h("frame", [h(loggedIn ? App : Login)]),
}).$start()
