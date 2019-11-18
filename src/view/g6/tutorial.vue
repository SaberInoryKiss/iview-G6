<template>
    <div>
        <h2>解释：本实例是对Tutorial-案例 的简单绘制和配置</h2>
        <div id="mountNode" style="background:#fff"></div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
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
                //  console.log(G6.Global.version);
                // const data = {
                    // 点集
                //     nodes: [{
                //         id: 'node1', // 节点的唯一标识
                //         x: 100,      // 节点横坐标
                //         y: 200,      // 节点纵坐标
                //         label: '起始点' // 节点文本
                //     },{
                //         id: 'node2',
                //         x: 300,
                //         y: 200,
                //         label: '目标点'
                //     }],
                //     // 边集
                //     edges: [
                //         // 表示一条从 node1 节点连接到 node2 节点的边
                //         {
                //             source: 'node1',  // 起始点 id
                //             target: 'node2',  // 目标点 id
                //             label: '我是连线'   // 边的文本
                //         }
                //     ]
                // };
                const graph = new G6.Graph({
                    container: 'mountNode',
                    width: 1500,
                    height: 750,
                    // nodeStyle: {
                    //     default: {
                    //         fill: '#40a9ff',
                    //         stroke: '#096dd9'
                    //     }
                    // },
                    // edgeStyle: {
                    //     default: { stroke: '#A3B1BF' }
                    // },
                    fitView: true,//设置是否将图适配到画布中；
                    fitViewPadding: [ 20, 40, 50, 20 ],//画布上四周的留白宽度。
                    defaultNode: {
                        size: 30,
                        labelCfg: {
                        style: {
                            fill: '#fff'
                        }
                        }
                    },
                    defaultEdge: {
                        labelCfg: {
                        autoRotate: true
                        }
                    },
                });
                //加载远程
                const main = async () => {
                    const response = await fetch('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
                    const remoteData = await response.json();
                    
                    const nodes = remoteData.nodes;
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
                            node.shape = 'circle';
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
                // graph.read(data);
            }
        }
    }
</script>
