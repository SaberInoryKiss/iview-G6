<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-06 09:56:58
 * @LastEditTime: 2019-11-13 15:58:28
 * @LastEditors: 夏开尧
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
  export default {
    name:'Ecahrt',
    data(){
      return{
        // 定义图表，各种参数
        // option: {
        //     title: {
        //         text: '堆叠区域图'
        //     },
        //     tooltip : {
        //         trigger: 'axis',
        //         axisPointer: {
        //             type: 'cross',
        //             label: {
        //                 backgroundColor: '#6a7985'
        //             }
        //         }
        //     },
        //     legend: {
        //         data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        //     },
        //     toolbox: {
        //         feature: {
        //             saveAsImage: {}
        //         }
        //     },
        //     grid: {
        //         left: '3%',
        //         right: '4%',
        //         bottom: '3%',
        //         containLabel: true
        //     },
        //     xAxis : [
        //         {
        //             type : 'category',
        //             boundaryGap : false,
        //             data : ['周一','周二','周三','周四','周五','周六','周日']
        //         }
        //     ],
        //     yAxis : [
        //         {
        //             type : 'value'
        //         }
        //     ],
        //     series : [
        //         {
        //             name:'邮件营销',
        //             type:'line',
        //             stack: '总量',
        //             areaStyle: {},
        //             data:[12, 13, 11, 14, 0,20, 20]
        //         },
        //         {
        //             name:'联盟广告',
        //             type:'line',
        //             stack: '总量',
        //             areaStyle: {},
        //             data:[20, 12, 11, 24, 29, 33, 31]
        //         },
        //         {
        //             name:'视频广告',
        //             type:'line',
        //             stack: '总量',
        //             areaStyle: {},
        //             data:[50, 22, 21, 14, 10, 30, 40]
        //         },
        //         {
        //             name:'直接访问',
        //             type:'line',
        //             stack: '总量',
        //             areaStyle: {normal: {}},
        //             data:[30, 32, 31, 34, 30, 30, 30]
        //         },
        //         {
        //             name:'搜索引擎',
        //             type:'line',
        //             stack: '总量',
        //             label: {
        //                 normal: {
        //                     show: true,
        //                     position: 'top'
        //                 }
        //             },
        //             areaStyle: {normal: {}},
        //             data:[80, 93, 1, 34, 120, 130, 130]
        //         }
        //     ]
        // }

        option: {
    title: {
        text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    legend: {
        x: "center",
        show: false,
        data: ["朋友", "战友", '亲戚']
    },
    series: [

        {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
                name: '朋友',
                itemStyle: {
                    normal: {
                        color: "#009800",
                    }
                }
            }, {
                name: '战友',
                itemStyle: {
                    normal: {
                        color: "#4592FF",
                    }
                }
            }, {
                name: '亲戚',
                itemStyle: {
                    normal: {
                        color: "#3592F",
                    }
                }
            }],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: "{c}"
                }
            },
            data: [{
                name: '徐贱云',
                draggable: true,
            }, {
                name: '冯可梁',
                category: 1,
                draggable: true,
            }, {
                name: '邓志荣',
                category: 1,
                draggable: true,
            }, {
                name: '李荣庆',
                category: 1,
                draggable: true,
            }, {
                name: '郑志勇',
                category: 1,
                draggable: true,
            }, {
                name: '赵英杰',
                category: 1,
                draggable: true,
            }, {
                name: '王承军',
                category: 1,
                draggable: true,
            }, {
                name: '陈卫东',
                category: 1,
                draggable: true,
            }, {
                name: '邹劲松',
                category: 1,
                draggable: true,
            }, {
                name: '赵成',
                category: 1,
                draggable: true,
            }, {
                name: '陈现忠',
                category: 1,
                draggable: true,
            }, {
                name: '陶泳',
                category: 1,
                draggable: true,
            }, {
                name: '王德福',
                category: 1,
                draggable: true,
            }],
            links: [{
                source: 0,
                target: 1,
                category: 0,
                value: '朋友'
            }, {
                source: 0,
                target: 2,
                value: '战友'
            }, {
                source: 0,
                target: 3,
                value: '房东'
            }, {
                source: 0,
                target: 4,
                value: '朋友'
            }, {
                source: 1,
                target: 2,
                value: '表亲'
            }, {
                source: 0,
                target: 5,
                value: '朋友'
            }, {
                source: 4,
                target: 5,
                value: '姑姑'
            }, {
                source: 2,
                target: 8,
                value: '叔叔'
            }, {
                source: 0,
                target: 12,
                value: '朋友'
            }, {
                source: 6,
                target: 11,
                value: '爱人'
            }, {
                source: 6,
                target: 3,
                value: '朋友'
            }, {
                source: 7,
                target: 5,
                value: '朋友'
            }, {
                source: 9,
                target: 10,
                value: '朋友'
            }, {
                source: 3,
                target: 10,
                value: '朋友'
            }, {
                source: 2,
                target: 11,
                value: '同学'
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                }
            }
        }
    ]
}


      }
    },
    mounted:function(){
    //   console.log(this.$echarts)
      let myechart = this.$echarts.init(this.$refs.myechart) //初始化一个echarts
      myechart.setOption(this.option)  //setOption 用this.option中的数据开始作图
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echart {
    width:100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center; /*定义echart的元素垂直居中*/
    justify-content: center; /*定义echart的里的元素水平居中*/
}
.HelloWorld{   
  width: 1000px;
  height:600px;
  background: #cce6f0;
}
</style>