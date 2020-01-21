<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-15 11:45:31
 * @LastEditTime: 2019-12-27 11:32:31
 * @LastEditors: Please set LastEditors
 * @UpdateLogs: logs
 -->
<style>
.g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
 
<template>
    <div>
        <div id="mountNode" style="background:#fff"></div>
    </div>
</template>

<script>
import G6 from "@antv/g6";
import img from "@/assets/images/gatewayOn.png"
export default {
    name: "start",
    created() {
        //不能在created方法中初始化
        //this.initG6()
    },
    mounted() {
        // img.onload = function() {
            this.initG6();
        // }
    },
    methods: {
        initG6() {
            // 设置锚点
            G6.registerNode('customNode', {
                intersectBox: 'circle', // 'circle', 'rect'
            });

            const data = {
                nodes: [{
                    id: 'node1',
                    x: 600.7150624852015,
                    y: 400.7150624852015,
                    label: 'node1',
                    shape: 'image',
                    img: img,
                    class: '交换机'
                }, {
                    id: 'node2',
                    x: 900.7150624852015,
                    y: 400.7150624852015,
                    label: 'node2',
                    shape: 'image',
                    img: img,
                    class: '交换机',
                    style: {
                        cursor: 'pointer'
                    },
                    labelCfg: {
                        position: 'bottom'
                    }
                }],
                edges: [{
                    source: 'node1',
                    target: 'node2',
                    label: 'hover 前的边文本',
                    style: {
                        lineWidth: 3,
                        lineAppendWidth: 24
                    },
                    labelCfg: {
                        refY: 10,
                    }
                }]
            };
            
            
            const graph = new G6.Graph({
                container: 'mountNode',
                width: 1500,
                height: 750,
                defaultNode: {
                    size: [60, 60]
                },
                defaultEdge: {
                    shape: 'quadratic',
                    style: {
                        stroke: '#b5b5b5',
                        
                    }
                },
                nodeStateStyles: {
                    hover: {
                        lineWidth: 5,
                        fillOpacity: 1,
                        fill: 'steelblue',
                        cursor: "pointer"
                    }
                },
                edgeStateStyles: {
                    hover: {
                        lineWidth: 12
                    }
                },
                modes: {
                    default: ['drag-node','zoom-canvas', 'drag-canvas',
                        //tooltip 节点提示框
                        {
                            type: 'tooltip', // 提示框
                            refX: '40',
                            formatText(model) {
                            // 提示框文本内容
                            const text =
                                    '节点: ' + model.label + '<br/> 类型: ' + model.class;
                            return text;
                            }
                        },
                        //edge-tooltip 边提示框
                        {
                            type: 'edge-tooltip',       // 边提示框
                            formatText(model) {         // 边提示框文本内容
                            const text = '起点: ' + model.source
                                + '<br/> 终点: ' + model.target
                                + '<br/> 线粗: ' + model.weight;
                            return text;
                            }
                        }
                    ]
                }
            });
            graph.data(data)
            graph.render()

            // 监听鼠标进入节点
            graph.on('node:mouseenter', e => {
                const tooltip = document.getElementsByClassName('g6-tooltip') || [];
                const bbox = tooltip[0] && tooltip[0].getBoundingClientRect();
                console.log(bbox.top)
                const {centerX, centerY, minX, minY, height} = e.item.getBBox();
                // console.log(tooltip[0])
                // console.log(e.item.getBBox())
                // console.log(graph.getClientByPoint(centerX,minY))
                const { x , y } = graph.getClientByPoint(centerX+20 ,minY+80);
                // console.log({ x , y })
                let OFFSET = 12;
                // console.log(x)
                G6.Util.modifyCSS(tooltip[0], {
                    position: 'fixed',
                    zIndex: '10000',
                    visibility: 'visible',
                    left: bbox.left + 'px',
                    top: bbox.top + 'px'
                    // left: '700px',
                    // top:'500px'
                })
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 为 true
                graph.setItemState(nodeItem, 'hover', true);
            });
            // 监听鼠标离开节点
            graph.on('node:mouseleave', e => {
                // const tooltip = document.getElementsByClassName('g6-tooltip') || [];
                // const bbox = tooltip[0] && tooltip[0].getBoundingClientRect();
                // const {centerX, centerY, minX, minY, height} = e.item.getBBox();
                // // console.log(tooltip[0])
                // console.log(e.item.getBBox())
                // // console.log(graph.getClientByPoint(centerX,minY))
                // const { x , y } = graph.getClientByPoint(centerX+20 ,minY+80);
                // let OFFSET = 12;
                // console.log(x)
                // G6.Util.modifyCSS(tooltip[0], {
                //     position: 'fixed',
                //     zIndex: '10000',
                //     visibility: 'hidden',
                //     left: x + 'px',
                //     top: y + 'px'
                //     // left: '700px',
                //     // top:'500px'
                // })
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 false
                graph.setItemState(nodeItem, 'hover', false);
            });
        }
    }
};
</script>
