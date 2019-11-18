/*
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-13 16:10:15
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import '@babel/polyfill'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import axios from 'axios'
import VueParticles from 'vue-particles'
import echarts from 'echarts'  //引入Echarts，

Vue.prototype.$echarts = echarts  //定义为全局变量


// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueParticles)


/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
// 将API方法绑定到全局
Vue.prototype.$axios = axios
// Vue.prototype.$qs = qs

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
