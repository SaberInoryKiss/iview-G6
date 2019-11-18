<template>   
    <div id="drag1" ref="myechart" style="width:1500px; height:800px;background:blue"></div>
    
    </div>
</template>

<script>
import echarts from 'echarts'
import HP from '@/assets/images/logo-top.png'
import AP from '@/assets/images/css.jpg'
import BP from '@/assets/images/H5.jpg'
import CP from '@/assets/images/java.jpg'
import DP from '@/assets/images/javascript.jpg'
import EP from '@/assets/images/mysql.jpg'
import FP from '@/assets/images/redis.jpg'
import GP from '@/assets/images/openstack.jpg'
import IP from '@/assets/images/404.jpg'
import JP from '@/assets/images/sdn.jpg'
import KP from '@/assets/images/vue.jpg'
export default {
    data() {
        return {
        }
    },
    methods: {
        getDrag() {
            // console.log(require('@/assets/images/logo-top.png'))
            var hp = HP;
            // console.log(hp) //../../../static/imgs/logo-top.png
            var myChart = echarts.init(this.$refs.myechart);
            
            var nodes = [{
                    x: '1',
                    y: '12',
                    name: 'DNS',
                    img: hp,
                },
                {
                    x: '1',
                    y: '3',
                    name: '爬虫数据',
                    img: BP,
                },
                {
                    x: '3',
                    y: '12',
                    name: '域名缓存',
                    img: CP,
                },
                {
                    x: '3',
                    y: '8',
                    name: 'DPI用户面',
                    img: DP,
                },
                {
                    x: '3',
                    y: '5',
                    name: '场景特征',
                    img: EP,
                },
                {
                    x: '3',
                    y: '1',
                    name: '终端特征',
                    img: FP,
                },
                {
                    x: '5',
                    y: '10',
                    name: '增强特征',
                    img: GP,
                },
                {
                    x: '7',
                    y: '12',
                    name: 'HTTP',
                    img: IP,
                },
                {
                    x: '7',
                    y: '8',
                    name: '通用',
                    img: JP,
                },
                {
                    x: '9',
                    y: '10',
                    name: '用户中间表',
                    img: KP,
                },
                {
                    x: '9',
                    y: '6',
                    name: '网元信息表',
                    img: BP,
                },
                {
                    x: '11',
                    y: '8',
                    name: '质差网元',
                    img: IP,
                },
            ]
            // console.log(nodes)
            var links = [{
                    source: 'DNS',
                    target: '域名缓存',
                    name: '访问'
                },
                {
                    source: '爬虫数据',
                    target: '场景特征',
                    name: '访问'
                },
                {
                    source: '爬虫数据',
                    target: '终端特征',
                    name: '访问'
                },
                {
                    source: '域名缓存',
                    target: '增强特征',
                    name: '访问'
                },
                {
                    source: 'DPI用户面',
                    target: '增强特征',
                    name: '访问'
                },
                {
                    source: '场景特征',
                    target: '增强特征',
                    name: '访问'
                },
                {
                    source: '终端特征',
                    target: '增强特征',
                    name: '访问'
                },
                {
                    source: '增强特征',
                    target: 'HTTP',
                    name: '访问'
                },
                {
                    source: '增强特征',
                    target: '通用',
                    name: '访问'
                },
                {
                    source: 'HTTP',
                    target: '用户中间表',
                    name: '访问'
                },
                {
                    source: '通用',
                    target: '用户中间表',
                    name: '访问'
                },
                {
                    source: '用户中间表',
                    target: '质差网元',
                    name: '访问'
                },
                {
                    source: '网元信息表',
                    target: '质差网元',
                    name: '访问'
                },

            ]
            var charts = {
                nodes: [],
                links: [],
                linesData: []
            }
            var dataMap = new Map()
            for (var j = 0; j < nodes.length; j++) {
                var x = parseInt(nodes[j].x)
                var y = parseInt(nodes[j].y)
                var node = {
                    name: nodes[j].name,
                    value: [x, y],
                    symbolSize: 20,
                    alarm: nodes[j].alarm,
                    symbol: 'image://' + nodes[j].img,
                    // symbol: 'image://http://thumb12.jfcdns.com/2018-06/bce5b231ad7df722.png',
                    itemStyle: {
                        normal: {
                            color: '#12b5d0',
                        }
                    }
                }
                dataMap.set(nodes[j].name, [x, y])
                charts.nodes.push(node)
            }
            console.log(node)
            for (var i = 0; i < links.length; i++) {
                var link = {
                    source: links[i].source,
                    target: links[i].target,
                    label: {
                        normal: {
                            show: true,
                            formatter: links[i].name
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#12b5d0'
                        }
                    }
                }
                charts.links.push(link)
                // 组装动态移动的效果数据
                var lines = [{
                    coord: dataMap.get(links[i].source)
                }, {
                    coord: dataMap.get(links[i].target)
                }]
                charts.linesData.push(lines)
            }
            var option = {
                title: {
                    text: '网络拓扑图'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}',
                },
                backgroundColor: "#F5F5F5",
                xAxis: {
                    min: 0,
                    max: 12,
                    show: false,
                    type: 'value'
                },
                yAxis: {
                    min: 0,
                    max: 12,
                    show: false,
                    type: 'value'
                },
                series: [{
                    type: 'graph',
                    layout: 'none',
                    id: 'a',
                    coordinateSystem: 'cartesian2d',
                    edgeSymbol: ['', 'arrow'],
                    // symbolSize: 50,
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            color: '#12b5d0'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            shadowColor: 'none'
                        }
                    },
                    xAxis: {
                        min: 0,
                        max: 12,
                        show: false,
                        type: 'value'
                    },
                    yAxis: {
                        min: 0,
                        max: 12,
                        show: false,
                        type: 'value'
                    },
                    // edgeSymbolSize: 8,
                    draggable: true,
                    data: charts.nodes,
                    links: charts.links,
                    z: 4,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: function(item) {
                                    return item.data.name
                                }
                            }
                        }
                    }
                }, {
                    name: 'A',
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    z: 4,
                    effect: {
                        show: true,
                        trailLength: 0,
                        symbol: 'arrow',
                        color: '#12b5d0',
                        symbolSize: 8
                    },
                    lineStyle: {
                        normal: {
                            curveness: 0
                        }
                    },
                    data: charts.linesData,

                }]
            };
            myChart.setOption(option);


            myChart.on('click', function(param) {
                var nodeses = [{
                        x: '1',
                        y: '12',
                        name: 'DNS',
                        img: 'data-1547632686885-o5Rfi3tyk.png',
                    },
                    {
                        x: '1',
                        y: '3',
                        name: '爬虫数据',
                        img: 'data-1547632686885-o5Rfi3tyk.png',
                    }
                ]
                var linkses = [{
                        source: 'DNS',
                        target: '爬虫数据',
                        name: '访问'
                    }

                ]
                console.info(1)
                var chartses = {
                    nodeses: [],
                    linkses: [],
                    linesDataes: []
                }
                var dataMapes = new Map()
                for (var j = 0; j < nodeses.length; j++) {
                    var x = parseInt(nodeses[j].x)
                    var y = parseInt(nodeses[j].y)
                    var node = {
                        name: nodeses[j].name,
                        value: [x, y],
                        symbolSize: 50,
                        alarm: nodeses[j].alarm,
                        symbol: 'image:///asset/get/s/' + nodeses[j].img,
                        itemStyle: {
                            normal: {
                                color: '#12b5d0',
                            }
                        }
                    }
                    dataMapes.set(nodeses[j].name, [x, y])
                    chartses.nodeses.push(node)
                }
                for (var i = 0; i < linkses.length; i++) {
                    var link = {
                        source: linkses[i].source,
                        target: linkses[i].target,
                        label: {
                            normal: {
                                show: true,
                                formatter: linkses[i].name
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#12b5d0'
                            }
                        }
                    }

                    chartses.linkses.push(link)
                    // 组装动态移动的效果数据
                    var linesess = [{
                        coord: dataMapes.get(linkses[i].source)
                    }, {
                        coord: dataMapes.get(linkses[i].target)
                    }]
                    chartses.linesDataes.push(linesess)
                }
                myChart.setOption({
                    notMerge: true,
                    series: [{
                        data: chartses.nodeses,
                        links: chartses.linkses,
                    }, {
                        data: chartses.linesDataes,
                    }],

                })
            });

            // setTimeout(function () {
            // Add shadow circles (which is not visible) to enable drag.
            myChart.setOption({
                graphic: echarts.util.map(charts.nodes, function(item, dataIndex) {
                    return {
                        type: 'circle',
                        position: myChart.convertToPixel('grid', item.value),
                        shape: {
                            cx: 5,
                            cy: 5,
                            r: 20
                        },
                        invisible: true,
                        draggable: true,
                        ondrag: echarts.util.curry(onPointDragging, dataIndex),
                        onmousemove: echarts.util.curry(showTooltip, dataIndex),
                        onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                        z: 100
                    };
                })
            });

            function onPointDragging(dataIndex, dx, dy) {
                var tempV = myChart.convertFromPixel('grid', this.position);
                charts.nodes[dataIndex].value = [tempV[0], tempV[1]];
                // Update data
                myChart.setOption({
                    series: [{
                        id: 'a',
                        data: charts.nodes
                    }]
                });
            }

            function showTooltip(dataIndex) {
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: dataIndex
                });
            }

            function hideTooltip(dataIndex) {
                myChart.dispatchAction({
                    type: 'hideTip'
                });
            }
            // }, 50);


            window.addEventListener('resize', function() {
                myChart.resize();
                myChart.setOption({
                    series: [{
                        id: 'a',
                        data: charts.nodes
                    }]
                });
            });
        },
    },

    mounted: function() {
        this.getDrag();
    },
}
</script>
