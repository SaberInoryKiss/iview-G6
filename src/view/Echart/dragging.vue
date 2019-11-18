<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-14 19:49:01
 * @LastEditTime: 2019-11-15 08:38:11
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>   
    <div id="drag1" ref="myechart" style="width:1500px; height:800px;background:#fff"></div>
    
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
        }
    },
    methods: {
        getDrag() {
            var myChart = echarts.init(this.$refs.myechart);

            var symbolSize = 20;
            var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

            var option = {
                title: {
                    text: 'Try Dragging these Points'
                },
                tooltip: {
                    triggerOn: 'none',
                    formatter: function (params) {
                        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
                    }
                },
                grid: {
                },
                xAxis: {
                    min: -100,
                    max: 80,
                    type: 'value',
                    axisLine: {onZero: false}
                },
                yAxis: {
                    min: -30,
                    max: 60,
                    type: 'value',
                    axisLine: {onZero: false}
                },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        filterMode: 'empty'
                    },
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                        filterMode: 'empty'
                    },
                    {
                        type: 'inside',
                        xAxisIndex: 0,
                        filterMode: 'empty'
                    },
                    {
                        type: 'inside',
                        yAxisIndex: 0,
                        filterMode: 'empty'
                    }
                ],
                series: [
                    {
                        id: 'a',
                        type: 'line',
                        smooth: true,
                        symbolSize: symbolSize,
                        data: data
                    }
                ]
            };

            myChart.setOption(option);

            if (!app.inNode) {
                setTimeout(function () {
                    // Add shadow circles (which is not visible) to enable drag.
                    myChart.setOption({
                        graphic: echarts.util.map(data, function (item, dataIndex) {
                            return {
                                type: 'circle',
                                position: myChart.convertToPixel('grid', item),
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: symbolSize / 2
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
                }, 0);

                window.addEventListener('resize', updatePosition);
            }

            myChart.on('dataZoom', updatePosition);

            function updatePosition() {
                myChart.setOption({
                    graphic: echarts.util.map(data, function (item, dataIndex) {
                        return {
                            position: myChart.convertToPixel('grid', item)
                        };
                    })
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

            function onPointDragging(dataIndex, dx, dy) {
                data[dataIndex] = myChart.convertFromPixel('grid', this.position);

                // Update data
                myChart.setOption({
                    series: [{
                        id: 'a',
                        data: data
                    }]
                });
            }

        },
    },

    mounted: function() {
        this.getDrag();
    },
}
</script>
