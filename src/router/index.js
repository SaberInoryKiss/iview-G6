/*
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-11 13:41:08
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
// const LOGIN_PAGE_NAME = 'login'
// //跳转-携带权限
// const turnTo = (to, access, next) => {
//   console.log('====access==userhave====')
//   console.log(access)
//   // 有权限，可访问
//   if (canTurnTo(to.name, access, routes)) next()
//   // 无权限，重定向到401页面
//   else next({ replace: true, name: 'error_401' })
// }
// // 每次路由跳转前判断权限
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   const token = getToken()
//   // 未登录且要跳转的页面不是登录页
//   // 跳转到登录页
//   if (!token && to.name !== LOGIN_PAGE_NAME) {
//     next({
//       name: LOGIN_PAGE_NAME
//     })
//   // 未登陆且要跳转的页面是登录页
//   // 跳转
//   } else if (!token && to.name === LOGIN_PAGE_NAME) {
//     next()
//   // 已登录且要跳转的页面是登录页
//   // 跳转到homeName页
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     next({
//       name: homeName
//     })
//   } else {
//     //登录，有用户信息
//     //判断权限access
//     if (store.state.user.hasGetInfo) {
//       turnTo(to, store.state.user.access, next)
//     //登录，没有用户信息，获取用户信息-sync异步
//     } else {
//       store.dispatch('getUserInfo').then(user => {
//         // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//         turnTo(to, user.access, next)
//       }).catch(() => {
//         setToken('')
//         next({
//           name: 'login'
//         })
//       })
//     }
//   }
// })
// // 路由跳转之后
// router.afterEach(to => {
//   setTitle(to, router.app)
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// })

export default router
