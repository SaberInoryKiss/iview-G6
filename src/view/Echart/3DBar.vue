<template>
  <div  class="echart">
    <div class="HelloWorld echart-box" id="myChart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-gl'
  //引入主模块
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');



  export default {
    name: 'globe',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'));
        //X轴数据
        var xData=['a','b','c','d','e','f','g'];
        var days=[''];
        //设置数据
        var data=[[0,0,5],[0,1,11],[0,2,3],[6,3,1],[6,4,2],[6,5,2],[6,6,6]];
        myChart.setOption({
          tooltip: {},
          visualMap: {
            max: 15,
            show:false,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          //设置X轴属性
          xAxis3D: {
            name: 'x',
            nameGap:1,   //坐标轴名称与轴线之间的距离，注意是三维空间的距离而非屏幕像素值。
            type: 'category',
            data: xData
          },
          yAxis3D: {
            name:'',
            type: 'category',
            data: days
          },
          zAxis3D: {
            name: '',
            type: 'value'
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 20,
            viewControl: {
              // projection: 'orthographic'
              alpha:0,
              beta:0
            }
          },

          series: [{
            type: 'bar3D',
            data: data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]],
              }
            }),
            shading: 'lambert',
          }]

        });
      }
    }
  }
</script>

<style scoped>
.echart {
    width:100%;
    /* min-height: 100%; */
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center; /*定义echart的元素垂直居中*/
    justify-content: center; /*定义echart的里的元素水平居中*/
}
.HelloWorld{   
    width: 1600px;
    height:770px;
    background: #fff;
}
</style>