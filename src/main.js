import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: [
      '^pages/me/main' // 指定首页
    ],
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#fff',
      'navigationBarTitleText': 'WeChat',
      'navigationBarTextStyle': 'black'
    }
  }
}
