<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-12 10:41:01
 * @LastEditTime: 2019-11-16 13:50:54
 * @LastEditors: 夏开尧
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
        <h2>解释：本实例基于Tutorial-案例 配置相关元素、使用力导向图布局以及图的交互和相关插件</h2>
        <div id="mountNode" style="background:#fff"></div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    import img from "@/assets/images/gatewayOn.png"
    const Minimap = require('@antv/g6/build/minimap');
    export default {
        name: "start",
        created() { //不能在created方法中初始化
            //this.initG6()
        },
        mounted(){
            this.initG6()
        },
        methods: {
            initG6(){
                //实例化minimap插件
                const minimap = new Minimap({
                    size: [ 200, 70 ],
                    className: "minimap",
                    type: 'delegate'
                });

                //grid和上面minimap一样创建实例在下面图中引入，这里就不用网格了，个人不喜欢

                //实例化图
                const graph = new G6.Graph({
                    container: 'mountNode',
                    width: 1500,
                    height: 700,
                    //复杂的布局系统会打破适配的规则，反而会造成更多的困扰
                    // fitView: true,//设置是否将图适配到画布中；
                    // fitViewPadding: [ 20, 40, 50, 20 ],//画布上四周的留白宽度。
                    layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
                        type: 'force',         // 指定为力导向布局
                        preventOverlap: true,  // 防止节点重叠
                        // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
                        linkDistance: 300 // 指定边距离为300
                    },
                    defaultNode: {
                        size: 30,
                        labelCfg: {
                            style: {
                                fill: '#fff'
                            },
                        },
                    },
                    defaultEdge: {
                        labelCfg: {
                            autoRotate: true
                        }
                    },
                    modes: {
                        default: [ 
                            'drag-canvas', 'zoom-canvas', 'drag-node', // 允许拖拽画布、放缩画布、拖拽节点
                            //tooltip 节点提示框
                            {
                                type: 'tooltip', // 提示框
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
                    },
                    // 节点不同状态下的样式集合
                    nodeStateStyles: {
                        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                        hover: {
                        fill: 'lightsteelblue'
                        },
                        // 鼠标点击节点，即 click 状态为 true 时的样式
                        click: {
                        stroke: '#000',
                        lineWidth: 3
                        }
                    },
                    // 节点不同状态下的样式集合
                    edgeStateStyles: {
                        // 鼠标点击边，即 click 状态为 true 时的样式
                        click: {
                        stroke: 'steelblue'
                        }
                    },

                    plugins: [ minimap ]// 将 minimap 实例配置到图上

                });
                //加载远程
                const main = async () => {
                    const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
                    const remoteData = await response.json();
                    // console.log(remoteData)

                    const nodes = remoteData.nodes;
                    console.log(nodes)//通过class来遍历循环给下面的node形状进行赋值
                    const edges = remoteData.edges;
                    nodes.forEach(node => {
                        if (!node.style) {
                        node.style = {};
                        }
                        node.style.lineWidth = 1;
                        node.style.stroke = '#666';
                        node.style.fill = 'steelblue';
                        switch (node.class) {
                        case 'c0': {
                            node.shape = 'image';
                            node.size = [ 35, 35 ];
                            node.img = img;
                            node.type = 'circle'
                            // node.clipCfg.show = true;
                            // node.clipCfg.type = 'circle';

                            break;
                        }
                        case 'c1': {
                            node.shape = 'rect';
                            node.size = [ 35, 20 ];
                            break;
                        }
                        case 'c2': {
                            node.shape = 'ellipse';
                            node.size = [ 35, 20 ];
                            break;
                        }
                        }
                    });
                    edges.forEach(edge => {
                        if (!edge.style) {
                        edge.style = {};
                        }
                        edge.style.lineWidth = edge.weight;
                        edge.style.opacity = 0.6;
                        edge.style.stroke = 'grey';
                    });
                    
                    graph.data(remoteData); // 加载远程数据
                    graph.render();         // 渲染
                };
                main();

                 // 监听鼠标进入节点
                graph.on('node:mouseenter', e => {
                    const nodeItem = e.item;
                    // 设置目标节点的 hover 状态 为 true
                    graph.setItemState(nodeItem, 'hover', true);
                });
                // 监听鼠标离开节点
                graph.on('node:mouseleave', e => {
                    const nodeItem = e.item;
                    // 设置目标节点的 hover 状态 false
                    graph.setItemState(nodeItem, 'hover', false);
                });
                // 监听鼠标点击节点
                graph.on('node:click', e => {
                    // 先将所有当前有 click 状态的节点的 click 状态置为 false
                    const clickNodes = graph.findAllByState('node', 'click');
                    clickNodes.forEach(cn => {
                    graph.setItemState(cn, 'click', false);
                    });
                    const nodeItem = e.item;
                    // 设置目标节点的 click 状态 为 true
                    graph.setItemState(nodeItem, 'click', true);
                });
                // 监听鼠标点击节点
                graph.on('edge:click', e => {
                    // 先将所有当前有 click 状态的边的 click 状态置为 false
                    const clickEdges = graph.findAllByState('edge', 'click');
                    clickEdges.forEach(ce => {
                    graph.setItemState(ce, 'click', false);
                    });
                    const edgeItem = e.item;
                    // 设置目标边的 click 状态 为 true
                    graph.setItemState(edgeItem, 'click', true);
                });
                
            }
        }
    }
</script>
