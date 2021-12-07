import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.serverUrl = "http://120.25.203.54:3000"
// Vue.prototype.serverUrl = "http://localhost:3000"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
