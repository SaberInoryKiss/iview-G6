<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-06 09:56:58
 * @LastEditTime: 2019-12-10 14:23:09
 * @LastEditors: Please set LastEditors
 * @UpdateLogs: logs
 -->
<template>
  <!--
  ref="myechart"定义该div也就是画布的名字，在this.$echarts.init(this.$refs.myechart) 图表初始化的时候使用
  this.$refs.myechart 也可以替换为 document.getElementById('main') 或者 document.getElementByClassName('echart-box')
  -->
  <div class="echart">
      <div class="HelloWorld echart-box" ref="myechart" id="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'  //引入Echarts，
require('echarts/theme/macarons'); //引用主题文件
require('echarts/theme/infographic'); //引用主题文件
require('echarts/theme/roma'); //引用主题文件
require('echarts/theme/shine'); //引用主题文件
require('echarts/theme/vintage'); //引用主题文件
require('echarts/theme/dark'); //引用主题文件
  export default {
    name:'Ecahrt',
    data(){
        return{
            //各种参数
            
          
        }
    },
    mounted() {
        this.charts()
    },
    methods: {
        charts() {
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            let myechart = this.$echarts.init(this.$refs.myechart) //初始化一个echarts
            myechart.setOption(
                        {
                            color: colors,

                            tooltip: {
                                trigger: 'none',
                                axisPointer: {
                                    type: 'cross'
                                }
                            },
                            legend: {
                                data:['2015 降水量', '2016 降水量']
                            },
                            grid: {
                                top: 70,
                                bottom: 50
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine: {
                                        onZero: false,
                                        lineStyle: {
                                            color: colors[1]
                                        }
                                    },
                                    axisPointer: {
                                        label: {
                                            formatter: function (params) {
                                                return '降水量  ' + params.value
                                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                            }
                                        }
                                    },
                                    data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
                                },
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine: {
                                        onZero: false,
                                        lineStyle: {
                                            color: colors[0]
                                        }
                                    },
                                    axisPointer: {
                                        label: {
                                            formatter: function (params) {
                                                return '降水量  ' + params.value
                                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                            }
                                        }
                                    },
                                    data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name:'2015 降水量',
                                    type:'line',
                                    xAxisIndex: 1,
                                    smooth: true,
                                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                                },
                                {
                                    name:'2016 降水量',
                                    type:'line',
                                    smooth: true,
                                    data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                                }
                            ]
                    }
            )  //setOption 用this.option中的数据开始作图 
        },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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