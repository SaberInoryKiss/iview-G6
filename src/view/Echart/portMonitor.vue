<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-06 09:56:58
 * @LastEditTime: 2019-12-27 17:17:57
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
            name:[],
            inBroadcastPkts: [],
            inDiscards: [],
            inMulticastPkts: [],
            inNUcastPkts: [],
            inOctets: [],
            inUcastPkts: [],
            inUnknownProtos: [],
            outMulticastPkts:[],
            outNUcastPkts:[],
        }
    },
    created(){
        this.getData();
    },
    methods: {
        charts() {
            console.log(this.$echarts)
            let myechart = this.$echarts.init(this.$refs.myechart,'shine') //初始化一个echarts
            myechart.setOption(
                        {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true
                                }
                            }
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar','stack', 'tiled']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        legend: {
                            selected:{
                                'inBroadcastPkts':false,
                                'inDiscards':false,
                                'inMulticastPkts':false,
                                'inNUcastPkts':false,
                                'inOctets':false,
                                'inUcastPkts':false,
                                'inUnknownProtos':false,
                                'outMulticastPkts':true, 
                                'outNUcastPkts':true
                                },
                            itemGap: 10
                        },
                        grid: {
                            top: '12%',
                            left: '1%',
                            right: '10%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type : 'category',
                                //存放端口名称
                                data : this.name
                            }
                        ],
                        yAxis: [
                            {
                                type : 'value',
                                name : '个数',
                                // axisLabel: {
                                    // formatter: function (a) {
                                    //     a = +a;
                                    //     return isFinite(a)
                                    //         ? echarts.format.addCommas(+a / 1000)
                                    //         : '';
                                    // }
                                // }
                            }
                        ],
                        dataZoom: [
                            {
                                show: true,
                                start: 0,
                                end: 100
                            },
                            {
                                type: 'inside',
                                start: 94,
                                end: 100
                            },
                            {
                                show: true,
                                yAxisIndex: 0,
                                filterMode: 'empty',
                                width: 30,
                                height: '80%',
                                showDataShadow: false,
                                left: '93%'
                            }
                        ],
                        series : [
                            //存放其他数据
                            {
                                name: 'inBroadcastPkts',
                                type: 'bar',
                                data: this.inBroadcastPkts
                            },
                            {
                                name: 'inDiscards',
                                type: 'bar',
                                data: this.inDiscards
                            },
                            {
                                name: 'inMulticastPkts',
                                type: 'bar',
                                data: this.inMulticastPkts
                            },
                            {
                                name: 'inNUcastPkts',
                                type: 'bar',
                                data: this.inNUcastPkts
                            },
                            {
                                name: 'inOctets',
                                type: 'bar',
                                data: this.inOctets
                            },
                            {
                                name: 'inUcastPkts',
                                type: 'bar',
                                data: this.inUcastPkts
                            },
                            {
                                name: 'inUnknownProtos',
                                type: 'bar',
                                data: this.inUnknownProtos
                            },
                            {
                                name: 'outMulticastPkts',
                                type: 'bar',
                                data: this.outMulticastPkts
                            },
                            {
                                name: 'outNUcastPkts',
                                type: 'bar',
                                data: this.outNUcastPkts
                            }
                        ]
                    }
            )  //setOption 用this.option中的数据开始作图 
        },
        getData() {
            this.$axios({
                method: "GET",
                url: "api/api/underlay/v1/port/scanPort/172.20.1.152",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Authorization': 'Basic YWRtaW46YWRtaW4='
                }
            }).then((res) => {
                const data = res.data
                
                let arr = [];
                let outMulticastPkts = [];
                let outNUcastPkts = [];
                let inBroadcastPkts = [];
                let inDiscards = [];
                let inMulticastPkts = [];
                let inNUcastPkts = [];
                let inOctets = [];
                let inUcastPkts = [];
                let inUnknownProtos = [];
                data.map(item => {
                    // console.log(item.ifName)
                    arr.push(item.ifName)  
                    outMulticastPkts.push(parseInt(item.ifOutMulticastPkts))
                    outNUcastPkts.push(parseInt(item.ifOutNUcastPkts))
                    inBroadcastPkts.push(parseInt(item.ifInBroadcastPkts))
                    inDiscards.push(parseInt(item.ifInDiscards))
                    inMulticastPkts.push(parseInt(item.ifInMulticastPkts))
                    inNUcastPkts.push(parseInt(item.ifInNUcastPkts))
                    inOctets.push(parseInt(item.ifInOctets))
                    inUcastPkts.push(parseInt(item.ifInUcastPkts))
                    inUnknownProtos.push(parseInt(item.ifInUnknownProtos))
                })
                this.name = arr
                this.outMulticastPkts = outMulticastPkts
                this.outNUcastPkts = outNUcastPkts
                this.inBroadcastPkts = inBroadcastPkts
                this.inDiscards = inDiscards
                this.inMulticastPkts =inMulticastPkts
                this.inNUcastPkts = inNUcastPkts
                this.inOctets = inOctets
                this.inUcastPkts = inUcastPkts
                this.inUnknownProtos = inUnknownProtos
                this.charts();
            }).catch((error) => {
                console.log(error);
            });
        }
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