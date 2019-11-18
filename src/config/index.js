/*
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-11 13:20:03
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 */
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'admin',
  /**
   * @description token在Cookie中存储的天数，默认30天
   */
  cookieExpires: 30,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   * dev:开发环境ajax地址
   * pro：生产环境ajax地址
   */
  baseUrl: {
    dev: 'http://localhost:8080/', // https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/
    pro: 'https://xxx.realDomain.com/'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
