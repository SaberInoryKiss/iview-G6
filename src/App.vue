<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-03-03 20:07:32
 * @LastEditTime: 2019-11-15 16:28:59
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
      setTimeout(() => {
          window.L2Dwidget.init({
          pluginRootPath: 'static/live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-z16/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '../static/live2dw/live2d-widget-model-z16/assets/z16.model.json' },
          display: { position: 'right', width: 300, height: 650 },
          mobile: { show: true },
          log: false
          })
      }, 1000)
  },
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
