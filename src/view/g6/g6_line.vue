<!--
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-11-15 11:45:31
 * @LastEditTime: 2019-11-29 08:42:43
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 -->
<template>
    <div>
        <h2>解释：本实例展示了两个节点之间多条连线，可以拖拽节点，拖拽、放大缩小画布</h2>
        <h2>注意：必须左键点击选中后才能拖拽，如果点的过快，没有选中节点，是没法拖拽节点的，这不是bug！！</h2>
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
        this.initG6();
    },
    methods: {
        initG6() {
            // 设置锚点
            G6.registerNode('customNode', {
                intersectBox: 'circle', // 'circle', 'rect'
            });
            const graph = new G6.Graph({
                container: 'mountNode',
                width: 1500,
                height: 750,
                defaultNode: {
                    size: [60, 60]
                },
                defaultEdge: {
                    shape: 'quadratic',
                    // size: 2,
                    style: {
                        stroke: '#83d5e2',
                        lineAppendWidth: 3
                    }
                },

                modes: {
                    default: [
                        'drag-node','zoom-canvas', 'drag-canvas','activate-relations'
                        ]
                },
                 nodeStateStyles: {
                    active: {
                    opacity: 1
                    },
                    inactive: {
                    opacity: 0.2
                    }
                },
                edgeStateStyles: {
                    active: {
                    stroke: '#999'
                    }
                }
            });

            const data = {
                nodes: [{
                        id: 'node1',
                        label: 'DC02-Leaf01',
                        x: 500,
                        y: 200,

                        //anchorPoints会连接到对应的锚点，比如圆会连接到包裹圆的正方形的边
                        anchorPoints: [
                            [1, 0.3],
                            [1, 0.4],
                            [1, 0.5],
                            [1, 0.6]
                        ],

                        // intersectPoint: [
                        //     [0.5, 0],
                        //     [1, 0.5]
                        // ],//和intersectBox效果类似

                        //intersectBox相交盒，用于计算交点和盒模型，从属于节点。
                        // intersectBox: [
                        //     [1, 0],
                        //     [1, 0.5]
                        // ],
                        shape: 'image',
                        img: img
                    },
                    {
                        id: 'node2',
                        label: 'DC02-Leaf02',
                        x: 900,
                        y: 200,
                        anchorPoints: [
                            [0, 0.3],
                            [0, 0.4],
                            [0, 0.5],
                            [0, 0.6]
                        ],
                        shape: 'image',
                        img: img
                    },
                    {
                        id: 'node3',
                        label: 'DC02-Leaf03',
                        x: 500,
                        y: 400,
                        intersectBox: [],
                        shape: 'image',
                        img: img
                    },
                    {
                        id: 'node4',
                        label: 'DC02-Leaf04',
                        x: 900,
                        y: 400,
                        intersectBox: [],
                        shape: 'image',
                        img: img
                    },
                    {
                        id: 'node5',
                        label: 'DC02-Leaf05',
                        x: 500,
                        y: 600,
                        intersectBox: [],
                        shape: 'image',
                        img: img
                    },
                    {
                        id: 'node6',
                        label: 'DC02-Leaf06',
                        x: 900,
                        y: 600,
                        intersectBox: [],
                        shape: 'image',
                        img: img
                    },
                ],
                edges: [{
                        source: 'node1',
                        target: 'node2',
                        sourceAnchor: 0,//表示从第一个锚点开始
                        targetAnchor: 0,//表示从最后一个锚点结束
                        style: {
                            endArrow: true
                        }
                    },
                    
                    {
                        source: 'node1',
                        target: 'node2',
                        sourceAnchor: 1,
                        targetAnchor: 1,
                        style: {
                            endArrow: true
                        }
                    },
                    {
                        source: 'node2',
                        target: 'node1',
                        sourceAnchor: 2,
                        targetAnchor: 2,
                        style: {
                            endArrow: true
                        }
                    },
                    {
                        source: 'node2',
                        target: 'node1',
                        sourceAnchor: 3,
                        targetAnchor: 3,
                        style: {
                            endArrow: true
                        }  
                    },
                    {
                        source: 'node2',
                        target: 'node3',
                        style: {
                            endArrow: true
                        }  
                    },
                    {
                        source: 'node3',
                        target: 'node4',
                        style: {
                            endArrow: true
                        }  
                    },
                    {
                        source: 'node4',
                        target: 'node3',
                        style: {
                            endArrow: true
                        }  
                    },
                    {
                        source: 'node3',
                        target: 'node5',
                        style: {
                            endArrow: true
                        }  
                    },
                    {
                        source: 'node5',
                        target: 'node6',
                        shape: 'cubic',
                        style: {
                            endArrow: true,
                            lineWidth: 5,
                            stroke: '#83d5e2',
                        }  
                    },
                ]
            }

            graph.data(data)
            graph.render()

            graph.getNodes().forEach(node => {
                console.log(node)
                const anchor = node.getAnchorPoints()
                console.log(anchor)
            })
            // graph.on('node:click', ev => {
            // const node = ev.item;
            // console.log('before hide(), the nodevisible = ', node.get('visible'));
            // node.hide();
            // graph.paint();
            // console.log('after hide(), the node visible = ', node.get('visible'));
            // });

            // // 鼠标点击边，隐藏该边
            // graph.on('edge:click', ev => {
            // const edge = ev.item;
            // console.log('before hide(), the edge visible = ', edge.get('visible'));
            // edge.hide();
            // graph.paint();
            // console.log('after hide(), the edge visible = ', edge.get('visible'));
            // });

            // // 鼠标点击画布，显示所有节点和边
            // graph.on('canvas:click', ev => {
            // const nodes = graph.getNodes();
            // const edges = graph.getEdges();
            // nodes.forEach(node => {
            //     node.show();
            // });
            // edges.forEach(edge => {
            //     edge.show();
            // });
            // graph.paint();
            // });
        }
    }
};
</script>
