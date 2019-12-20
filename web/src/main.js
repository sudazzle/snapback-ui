import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import App from "./App.vue"
import router from "./routes"
import store from "../../data/store"
import { getBaseUrl, isLoggedIn, getAuthToken } from "./utils"
import "../styles/custom.scss"

const loggedIn = isLoggedIn()

Vue.use(BootstrapVue)
Vue.config.productionTip = false

store.setBaseUrl(getBaseUrl())

if (loggedIn) {
  store.setAuthHeader(getAuthToken())
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")